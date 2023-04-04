import { useEffect, useState } from "react";
import useForm from "../../../libs/hooks/useForm";

const useSection = ({
  section,
  tasks,
  updateSection,
  deleteSection,
  deleteSectionTasks,
  loadTasks,
  reorderTask,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCtxMenuOpened, setIsCtxMenuOpened] = useState(false);
  const [isAddNewTaskActive, setIsAddNewTaskActive] = useState(false);

  const { form, setForm, onChange, getParams, resetForm, validate } = useForm({
    board_id: { rules: ["required"], value: section.board_id },
    name: { rules: ["required"], value: section.name },
  });

  useEffect(() => {
    const shouldLoadTasks = section.shouldLoadTasks ?? true;

    if (shouldLoadTasks) {
      setIsLoading(true);
      loadTasks({ section_id: section.id }).then(() => setIsLoading(false));
    }
  }, []);

  const onTaskDragEnd = ({ from, to, item, oldIndex, newIndex }) => {
    const oldSectionId = parseInt(from.dataset.id);
    const newSectionId = parseInt(to.dataset.id);

    if (oldIndex === newIndex && oldSectionId === newSectionId) return;

    const taskId = parseInt(item.dataset.id);

    reorderTask(taskId, { order: newIndex, section_id: newSectionId });
  };

  const onBlur = () => submitForm();

  const onSubmit = (e) => {
    e.preventDefault();

    submitForm();
  };

  const submitForm = () => {
    const { isValid, errors } = validate(form);

    if (isValid) {
      const params = getParams();

      updateSection(section, params).then(() => {
        resetForm();
      });
    } else {
      resetForm(true);
    }

    setForm({ ...form, isValid, errors, isSubmitted: true });
  };

  const ctxMenuOptions = [
    {
      items: [
        {
          value: "add_task",
          label: "Add card...",
          onClick: () => setIsAddNewTaskActive(true),
        },
        { value: "copy_section", label: "Copy list..." },
        { value: "move_section", label: "Move list..." },
        { value: "watch", label: "Watch" },
      ],
    },
    {
      label: "Automation",
      items: [
        {
          value: "added_to_section",
          label: "When a card is added to the list…",
        },
        { value: "ed_sort_section", label: "Every day, sort list by…" },
        { value: "em_sort_section", label: "Every Monday, sort list by…" },
        { value: "create_rule", label: "Create a rule" },
      ],
    },
    {
      items: [
        { value: "move_all_tasks", label: "Move all cards in this list…" },
        {
          value: "archive_all_tasks",
          label: "Archive all cards in this list…",
          onClick: () => deleteSectionTasks(section),
        },
      ],
    },
    {
      items: [
        {
          value: "archive_section",
          label: "Archive this list",
          onClick: () => deleteSection(section),
        },
      ],
    },
  ];

  return {
    section,
    tasks,
    form,
    isLoading,
    onChange,
    onSubmit,
    onBlur,
    isCtxMenuOpened,
    setIsCtxMenuOpened,
    onTaskDragEnd,
    ctxMenuOptions,
    isAddNewTaskActive,
    setIsAddNewTaskActive,
  };
};

export default useSection;
