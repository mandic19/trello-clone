import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import styles from "./context.menu.module.css";

const ContextMenu = ({ title, options = [], onClose, ...props }) => {
  const ref = useRef(null);
  useEffect(() => {
    document.dispatchEvent(new Event("ctx-menu-init"));

    document.addEventListener("mouseup", outOfFocusHandler);
    document.addEventListener("ctx-menu-init", ctxMenuInitHandler);

    return () => {
      document.removeEventListener("mouseup", outOfFocusHandler);
      document.removeEventListener("ctx-menu-init", ctxMenuInitHandler);
    };
  }, [ref]);

  const outOfFocusHandler = (e) => {
    if (!(ref.current && ref.current.contains(e.target))) {
      onClose();
    }
  };

  const ctxMenuInitHandler = () => onClose();

  return (
    <div className={styles.contextMenu} ref={ref} {...props}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <span className={styles.closeBtn} onClick={onClose}>
          <FontAwesomeIcon
            icon={faTimes}
            size="lg"
            color="var(--text-secondary)"
          />
        </span>
        <Separator />
      </div>
      <div className={styles.body}>
        {options.map(({ label = null, items = [] }, index) => {
          return (
            <div key={index}>
              <div className={styles.groupContainer}>
                {label && <div className={styles.gruopLabel}>{label}</div>}
                {items.map(({ label, value, onClick, disabled = false }) => (
                  <div
                    key={value}
                    className={styles.groupItem}
                    onClick={(e) => {
                      if (
                        typeof onClose === "function" &&
                        typeof onClick === "function"
                      ) {
                        onClose(e);
                        onClick(e);
                      }
                    }}
                    disabled={typeof onClick !== "function" || disabled}
                  >
                    {label}
                  </div>
                ))}
              </div>
              {options.length !== index + 1 && <Separator />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Separator = () => <div className={styles.separator} />;

export default ContextMenu;
