import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createTask } from "../../../../libs/redux/actions/taskActions";
import InputInline from "../../../input-inline/InputInline";
import useForm from "../../../../libs/hooks/useForm";
import "./AddNewTask.css";

const AddNewTask = ({
  section_id,
  order,
  createTask,
  isActiveOverride,
  onCancelCallback,
}) => {
  const { form, setForm, resetForm, onChange, getParams, validate } = useForm({
    section_id: { rules: ["required"], value: section_id },
    name: { rules: ["required"] },
  });

  const [isActive, setIsActive] = useState(false);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      setIsActive(isActiveOverride);
    }
  }, [isActiveOverride]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const onClick = () => setIsActive((prev) => !prev);

  const onCancel = () => {
    setIsActive(false);
    onCancelCallback();
  };

  const onBlur = () => submitForm();

  const onSubmit = (e) => {
    e.preventDefault();

    submitForm();
  };

  const submitForm = () => {
    const { isValid, errors } = validate(form);
    setForm({ ...form, isValid, errors, isSubmitted: true });

    if (isValid) {
      createTask({ ...getParams(), order });
    }

    resetForm(true);
    onCancel();
  };

  return (
    <div className="add-new-task">
      {isActive ? (
        <InputInline
          name="name"
          onBlur={onBlur}
          onSubmit={onSubmit}
          onCancel={onCancel}
          onChange={onChange}
          showSubmit={true}
          isTextarea={true}
          autoFocus={true}
          autoWidth={false}
          initialIsInFocus={true}
          submitText="Add card"
          placeholder="Enter a title for this card..."
          className="wrapper"
          rows={3}
        />
      ) : (
        <button className="btn btn-neutral" onClick={onClick}>
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add a card
        </button>
      )}
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  createTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTask);
