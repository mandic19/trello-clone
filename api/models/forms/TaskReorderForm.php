<?php

namespace api\models\forms;

use app\models\Section;
use api\helpers\ReorderHelper;
use app\models\Task;
use yii\db\Expression;
use yii\helpers\ArrayHelper;

class TaskReorderForm extends Task
{
    private $oldOrder;
    private $oldSectionId;

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return ArrayHelper::merge(parent::rules(), [
            [['order'], 'required']
        ]);
    }

    public function save($runValidation = true, $attributeNames = null)
    {
        $transaction = \Yii::$app->db->beginTransaction();

        $this->oldOrder = $this->getOldAttribute('order');
        $this->oldSectionId = $this->getOldAttribute('section_id');

        if (!parent::save($runValidation, $attributeNames)) {
            $transaction->rollBack();
            return false;
        }

        if (!$this->updateOrderHierarchy()) {
            $transaction->rollBack();
            return false;
        }

        $transaction->commit();
        return true;
    }

    protected function updateOrderHierarchy()
    {
        $newOrder = intval($this->order);

        $orderExpression = new Expression('IFNULL(`order`, 0)');
        $conditions = [
            'AND',
            ['section_id' => $this->section_id],
            ['!=', 'id', $this->id]
        ];

        if($this->oldSectionId != $this->section_id){
            $inc = 1;
            $conditions = ArrayHelper::merge($conditions, [['>=', $orderExpression, $newOrder]]);
        }
        else{
            list($inc, $bottomLimit, $topLimit) = ReorderHelper::getParameters($this->oldOrder, $newOrder);
            $conditions = ArrayHelper::merge($conditions, [['BETWEEN', $orderExpression, $bottomLimit, $topLimit]]);
        }

        Task::updateAll(['order' => new Expression("IFNULL(`order`, 0) + {$inc}")], $conditions);
        return true;
    }
}
