import { useRef } from "react";
import { useEffect } from "react";
import useForm from "../../../libs/hooks/useForm";

const useBoard = ({
  board,
  sections,
  updateBoard,
  reorderSection,
  invalidateSectionsState,
  invalidateTasksState,
}) => {
  const isMounted = useRef(false);

  const { form, setForm, resetForm, onChange, getParams, validate } = useForm({
    name: { rules: ["required"], value: board.name },
  });

  useEffect(() => {
    isMounted.current = true;
    return () => {
      invalidateSectionsState();
      invalidateTasksState();
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
    reorderSection(sectionId, { order: newIndex });
  };

  return {
    board,
    sections,
    form,
    onChange,
    onSubmit,
    onBlur,
    onSectionDragEnd,
  };
};

export default useBoard;
