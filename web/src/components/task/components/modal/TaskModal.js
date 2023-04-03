import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import {
  updateTask,
  deleteTask,
} from "../../../../libs/redux/actions/taskActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBars,
  faBarsProgress,
  faBoxArchive,
  faCheckToSlot,
  faClock,
  faCopy,
  faPaperclip,
  faPlus,
  faServer,
  faShare,
  faTag,
  faTimes,
  faUser,
  faWindowMaximize,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import InputInline from "../../../input-inline/InputInline";
import useForm from "../../../../libs/hooks/useForm";
import "./TaskModal.css";

Modal.setAppElement("#root");

const TaskModal = ({
  task,
  section,
  isOpen,
  onClose,
  updateTask,
  deleteTask,
}) => {
  const { form, setForm, onChange, getParams, resetForm, validate } = useForm({
    name: {
      rules: [
        "required",
        {
          validator: "maxLength",
          props: { max: 255 },
        },
      ],
      value: task.name,
    },
    description: {
      value: task.description,
    },
  });


  const onBlur = () => submitForm();

  const onSubmit = (e) => {
    e.preventDefault();

    submitForm();
  };

  const submitForm = () => {
    const { isValid, errors } = validate(form);

    if (isValid) {
      const params = getParams();

      updateTask(task, params).then(() => {
        resetForm();
      });
    } else {
      resetForm(true);
    }

    setForm({ ...form, isValid, errors, isSubmitted: true });
  };

  const onDelete = () => {
    onClose();
    deleteTask(task);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="close" onClick={onClose}>
        <FontAwesomeIcon
          icon={faTimes}
          size="lg"
          color="var(--text-secondary)"
        />
      </div>
      <div className="task-modal">
        <div className="header">
          <FontAwesomeIcon icon={faBarsProgress} size="xl" className="icon" />
          <div className="title">
            <InputInline
              name="name"
              value={form.fields.name.value}
              onChange={onChange}
              onSubmit={onSubmit}
              onBlur={onBlur}
              className="px-1 d-flex"
            />
            <div className="subtitle">in list {section.name}</div>
          </div>
        </div>
        <div className="body">
          <div className="content">
            <div className="d-flex">
              <FontAwesomeIcon icon={faBars} size="xl" />
              <div className="description">
                <h3 className="mt-0">Description</h3>
                <InputInline
                  name="description"
                  onBlur={onBlur}
                  onSubmit={onSubmit}
                  onChange={onChange}
                  isTextarea={true}
                  autoWidth={false}
                  placeholder="Add a more detailed desription..."
                  className="desc-wrapper"
                  rows={3}
                  value={form.fields.description.value ?? ""}
                />
              </div>
            </div>
          </div>
          <div className="sidebar">
            <div className="group">
              <div className="label">Add to card</div>
              <div className="item">
                <button className="btn btn-secondary" disabled={true}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-1"
                    color="var(--text-secondary)"
                  />
                  Members
                </button>
              </div>
              <div className="item">
                <button className="btn btn-secondary" disabled={true}>
                  <FontAwesomeIcon
                    icon={faTag}
                    className="mr-1"
                    color="var(--text-secondary)"
                  />
                  Labels
                </button>
              </div>
              <div className="item">
                <button className="btn btn-secondary" disabled={true}>
                  <FontAwesomeIcon
                    icon={faCheckToSlot}
                    className="mr-1"
                    color="var(--text-secondary)"
                  />
                  Checklist
                </button>
              </div>
              <div className="item">
                <button className="btn btn-secondary" disabled={true}>
                  <FontAwesomeIcon
                    icon={faClock}
                    className="mr-1"
                    color="var(--text-secondary)"
                  />
                  Dates
                </button>
              </div>
              <div className="item">
                <button className="btn btn-secondary" disabled={true}>
                  <FontAwesomeIcon
                    icon={faPaperclip}
                    className="mr-1"
                    color="var(--text-secondary)"
                  />
                  Attachment
                </button>
              </div>
              <div className="item">
                <button className="btn btn-secondary" disabled={true}>
                  <FontAwesomeIcon
                    icon={faWindowMaximize}
                    className="mr-1"
                    color="var(--text-secondary)"
                  />
                  Cover
                </button>
              </div>
              <div className="item">
                <button className="btn btn-secondary" disabled={true}>
                  <FontAwesomeIcon
                    icon={faServer}
                    className="mr-1"
                    color="var(--text-secondary)"
                  />
                  Custom Fields
                </button>
              </div>
            </div>
            <div className="group">
              <div className="label">Power-Ups</div>
              <div className="item">
                <button className="btn btn-neutral" disabled={true}>
                  <FontAwesomeIcon icon={faPlus} className="mr-1" />
                  Add Power-Ups
                </button>
              </div>
            </div>
            <div className="group">
              <div className="label">Automation</div>
              <div className="item">
                <button className="btn btn-neutral" disabled={true}>
                  <FontAwesomeIcon icon={faPlus} className="mr-1" />
                  Add button
                </button>
              </div>
            </div>
            <div className="group">
              <div className="label">Actions</div>
              <div className="item">
                <button className="btn btn-secondary" disabled={true}>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="mr-1"
                    color="var(--text-secondary)"
                  />
                  Move
                </button>
              </div>
              <div className="item">
                <button className="btn btn-secondary" disabled={true}>
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="mr-1"
                    color="var(--text-secondary)"
                  />
                  Copy
                </button>
              </div>
              <div className="item">
                <button className="btn btn-secondary" disabled={true}>
                  <FontAwesomeIcon
                    icon={faWindowRestore}
                    className="mr-1"
                    color="var(--text-secondary)"
                  />
                  Make template
                </button>
              </div>
              <div className="item">
                <button className="btn btn-secondary" onClick={onDelete}>
                  <FontAwesomeIcon
                    icon={faBoxArchive}
                    className="mr-1"
                    color="var(--text-secondary)"
                  />
                  Archive
                </button>
              </div>
              <div className="item">
                <button className="btn btn-secondary" disabled={true}>
                  <FontAwesomeIcon
                    icon={faShare}
                    className="mr-1"
                    color="var(--text-secondary)"
                  />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state, props) => {
  return {
    section: state.sections.find((x) => props.task.section_id === x.id),
  };
};

const mapDispatchToProps = {
  updateTask,
  deleteTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);
