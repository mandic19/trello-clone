import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./input.module.css";

const ENTER_KEY = 13;

const InputInline = ({
  value,
  onCancel,
  onSubmit,
  onChange,
  onBlur,
  className,
  initialIsInFocus = false,
  autoWidth = true,
  isTextarea = false,
  showSubmit = false,
  submitText = "Submit",
  group = "any",
  ...props
}) => {
  const isMounted = useRef(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState(value);
  const [isInFocus, setIsInFocus] = useState(initialIsInFocus);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!isMounted.current) return;

    if (isInFocus) {
      inputRef.current.focus();
      return;
    }

    if (typeof onBlur === "function") {
      onBlur();
    }
  }, [isInFocus]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    const initEventName = `input-inline-init-${group}`;
    document.dispatchEvent(new Event(initEventName));

    document.addEventListener("mouseup", outOfFocusHandler);
    document.addEventListener(initEventName, onFocusOutHandler);

    normalizeTextareaHeight();
    return () => {
      document.removeEventListener("mouseup", outOfFocusHandler);
      document.removeEventListener(initEventName, onFocusOutHandler);
    };
  }, [wrapperRef]);

  const outOfFocusHandler = (e) => {
    const isOutOfFocus = !(
      wrapperRef.current && wrapperRef.current.contains(e.target)
    );

    if (isOutOfFocus) {
      setIsInFocus(false);
    }
  };

  const onFocusOutHandler = () => setIsInFocus(false);

  const wrapperClassList = [styles.wrapper];

  if (isInFocus) {
    wrapperClassList.push(styles.wrapperFocused);
  }

  if (className) {
    wrapperClassList.push(className);
  }

  const wrapperClassName = wrapperClassList.join(" ");

  const handleOnChange = (e) => {
    normalizeTextareaHeight();
    setInputValue(e.target.value);
    onChange(e);
  };

  const handleOnKeyDown = (e) => {
    if (e.which !== ENTER_KEY) return;

    if (e.ctrlKey) {
      const position = inputRef.current.selectionEnd;

      inputRef.current.value =
        inputRef.current.value.substring(0, position) +
        "\n" +
        inputRef.current.value.substring(position);
      inputRef.current.selectionEnd = position + 1;

      handleOnChange(e);
    } else {
      onSubmit(e);
      setIsInFocus(false);
    }
  };

  const getInputProps = () => {
    const inputProps = {
      ref: inputRef,
      onChange: handleOnChange,
      onKeyDown: handleOnKeyDown,
      className: styles.input,
      value: inputValue,
      readOnly: !isInFocus,
      autoComplete: "off",
      ...props,
    };

    if (isTextarea) {
      inputProps.className += ` ${styles.textarea}`;
    }

    return inputProps;
  };

  const normalizeTextareaHeight = () => {
    if (isTextarea) {
      inputRef.current.style.height = "inherit";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div
        ref={wrapperRef}
        className={wrapperClassName}
        onClick={() => setIsInFocus(true)}
      >
        {isTextarea ? (
          <textarea {...getInputProps()} />
        ) : (
          <input {...getInputProps()} />
        )}
        {autoWidth && <span className={styles.ghost}>{inputValue}</span>}
      </div>
      {showSubmit && (
        <div className="mt-1">
          <input type="submit" value={submitText} className="btn btn-primary" />
          <button type="button" className="btn btn-link" onClick={onCancel}>
            <FontAwesomeIcon icon={faTimes} size="xl" />
          </button>
        </div>
      )}
    </form>
  );
};

export default InputInline;
