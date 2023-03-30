import React, { useEffect, useRef } from "react";
import Sortable from "sortablejs";
import "./SortableList.css";

const SortableList = ({
  children,
  className = "sortable-container",
  options = {},
  ...props
}) => {
  const ref = useRef(null);
  const sortable = useRef(null);

  useEffect(() => {
    if (ref.current) {
      sortable.current = Sortable.create(ref.current, {
        ...defaultOptions,
        ...options,
      });
    }

    return () => {
      sortable.current.destroy();
    };
  }, [ref.current]);

  return (
    <div className={className} {...props} ref={ref}>
      {children}
    </div>
  );
};

const defaultOptions = {
  filter: ".sortable-ignore",
  forceFallback: true,
  onAdd: (evt) => {
    evt.from.insertBefore(evt.item, null);
  },
};

export default SortableList;
