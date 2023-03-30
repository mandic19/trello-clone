import { useEffect, useState } from "react";
import useForm from "../../../libs/hooks/useForm";

const useSection = ({
  section,
  tasks,
  updateSection,
  deleteSection,
  loadTasks,
  invalidateTasksState,
  reorderTask,
}) => {
  const [isLoading, setIsLoading] = useState(false);

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

    return () => {
      invalidateTasksState();
    };
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

  const getHamburgerMenuOptions = () => {
    return [
      { content: "Archive this list", onClick: () => deleteSection(section) },
    ];
  };

  return {
    section,
    tasks,
    form,
    isLoading,
    onChange,
    onSubmit,
    onBlur,
    onTaskDragEnd,
    getHamburgerMenuOptions,
  };
};

export default useSection;
