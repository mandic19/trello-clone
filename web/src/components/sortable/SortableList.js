import React, { useEffect, useRef } from "react";
import Sortable from "sortablejs";
import "./SortableList.css";

const SortableList = ({
  children,
  className = "sortable-container",
  ...props
}) => {
  const ref = useRef(null);
  const sortable = useRef(null);

  useEffect(() => {
    if (ref.current) {
      sortable.current = Sortable.create(ref.current, {
        ...defaultOptions,
        ...props,
      });
    }

    return () => {
      sortable.current.destroy();
    };
  }, [ref.current]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

const defaultOptions = {
  filter: ".sortable-ignore",
  forceFallback: true,
  emptyInsertThreshold: 100,
};

export default SortableList;
