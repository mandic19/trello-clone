import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { createBoard } from "../../../../libs/redux/actions/boardActions";
import InputInline from "../../../input-inline/InputInline";
import useForm from "../../../../libs/hooks/useForm";
import "./AddNewBoard.css";

const AddNewBoard = ({ createBoard }) => {
  const { form, setForm, resetForm, onChange, getParams, validate } = useForm({
    name: { rules: ["required"] },
  });

  const [isActive, setIsActive] = useState(false);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const onClick = () => setIsActive((prev) => !prev);

  const onCancel = () => setIsActive(false);

  const onSubmit = (e) => {
    e.preventDefault();

    submitForm();
  };

  const submitForm = () => {
    const { isValid, errors } = validate(form);
    setForm({ ...form, isValid, errors, isSubmitted: true });

    if (isValid) {
      createBoard(getParams());
    }

    resetForm(true);
    onCancel();
  };

  return (
    <div className="add-new-board">
      {isActive ? (
        <InputInline
          name="name"
          onBlur={onCancel}
          onSubmit={onSubmit}
          onCancel={onCancel}
          onChange={onChange}
          showSubmit={true}
          isTextarea={true}
          autoFocus={true}
          autoWidth={false}
          initialIsInFocus={true}
          submitText="Add board"
          placeholder="Enter a title for this board..."
          className="borad-input-wrapper"
          rows={3}
        />
      ) : (
        <button className="btn btn-secondary add-board-btn" onClick={onClick}>
          Create new board
        </button>
      )}
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  createBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewBoard);
