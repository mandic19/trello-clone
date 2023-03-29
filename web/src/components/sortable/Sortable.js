import React, { useEffect, useRef } from "react";
import Sortable from "sortablejs";
import "./Sortable.css";

const SortableList = ({
  children,
  className = "sortable-container",
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      Sortable.create(ref.current, { ...defaultOptions, ...props });
    }
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
};

export default SortableList;
