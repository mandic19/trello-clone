import { useRef, useState } from "react";
import { useEffect } from "react";
import useForm from "../../../libs/hooks/useForm";
import { useNavigate } from "react-router-dom";

const useBoard = ({
  board,
  sections,
  updateBoard,
  deleteBoard,
  reorderSection,
  invalidateSectionsState,
  invalidateTasksState,
}) => {
  const [isCtxMenuOpened, setIsCtxMenuOpened] = useState(false);
  const isMounted = useRef(false);
  const navigate = useNavigate();

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

  const ctxMenuOptions = [
    {
      label: "Navigation",
      items: [
        {
          value: "board_index",
          label: "All boards...",
          onClick: () => navigate("/home"),
        },
      ],
    },
    {
      items: [
        {
          value: "delete_board",
          label: "Archive this board",
          onClick: () => {
            deleteBoard(board);
            navigate("/home");
          },
        },
      ],
    },
  ];

  return {
    board,
    sections,
    form,
    onChange,
    onSubmit,
    onBlur,
    onSectionDragEnd,
    isCtxMenuOpened,
    setIsCtxMenuOpened,
    ctxMenuOptions,
  };
};

export default useBoard;
