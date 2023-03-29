import { useRef } from "react";
import { useEffect } from "react";
import useForm from "../../../libs/hooks/useForm";

const useBoard = ({
  board,
  sections,
  updateBoard,
  reorderSection,
  reorderTask,
  invalidateSectionsState,
}) => {
  const isMounted = useRef(false);

  const { form, setForm, resetForm, onChange, getParams, validate } = useForm({
    name: { rules: ["required"], value: board.name },
  });

  useEffect(() => {
    isMounted.current = true;
    return () => {
      invalidateSectionsState();
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    submitForm();
  };

  const onBlur = () => submitForm();

  const submitForm = () => {
    const { isValid, errors } = validate(form);

    if (isValid) {
      const params = getParams();

      updateBoard(board, params).then(() => resetForm());
    } else {
      resetForm(true);
    }

    setForm({ ...form, isValid, errors, isSubmitted: true });
  };

  const onSectionDragEnd = ({ oldIndex, newIndex, item }) => {
    if (oldIndex === newIndex) return;

    const sectionId = parseInt(item.dataset.id);
    const section = sections.find((x) => x.id === sectionId);

    if (section) {
      reorderSection(section, { order: newIndex });
    }
  };

  const onTaskDragEnd = (res) => {
    // dropped outside the list
    if (!res.destination) {
      return;
    }

    const { destination, source, draggableId } = res;

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    const taskId = parseInt(draggableId);
    const order = destination.index;
    const section_id = parseInt(
      destination.droppableId.replace("section-droppable-", "")
    );

    reorderTask(taskId, { order, section_id });
  };

  return {
    board,
    sections,
    form,
    onChange,
    onSubmit,
    onBlur,
    onSectionDragEnd,
    onTaskDragEnd,
  };
};

export default useBoard;
