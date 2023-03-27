<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%task}}`.
 */
class m230110_104005_create_task_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%task}}', [
            'id' => $this->primaryKey(),
            'section_id' => $this->integer()->notNull(),
            'name' => $this->string(255),
            'description' => $this->text(),
            'order' => $this->integer(),
            'created_at' => $this->integer(),
            'created_by' => $this->integer(),
            'updated_at' => $this->integer(),
            'updated_by' => $this->integer(),
            'is_deleted' => $this->tinyInteger()->defaultValue(0)
        ], 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB');

        $this->addForeignKey('fk_section_task', 'task', 'section_id', 'section', 'id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk_section_task', 'task');

        $this->dropTable('{{%task}}');
    }
}
