import React, { useEffect, useMemo, useRef, useState } from "react";
import { Popover } from "react-tiny-popover";
import "./Dropdown.css";

const Dropdown = ({
  children,
  items,
  isDisabled = false,
  menuStyle = {},
  ...props
}) => {
  const controlRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([{ isIntersecting, isVisible }]) => {
        setIsVisible(isIntersecting || isVisible);
      }),
    []
  );

  useEffect(() => {
    observer.observe(controlRef.current);

    return () => observer.disconnect();
  }, [controlRef]);

  const handleOnClick = (e) => {
    e.propagate = true;
    if (isDisabled) return;

    setIsOpen((prevState) => !prevState);
  };

  return (
    <Popover
      isOpen={isOpen}
      containerClassName="dropdown"
      align="start"
      reposition={true}
      positions={["bottom", "top", "right", "left"]}
      content={() =>
        isVisible ? <DropdownMenu items={items} style={menuStyle} /> : ""
      }
      onClickOutside={() => setIsOpen(false)}
      ref={controlRef}
      {...props}
    >
      <div onClick={handleOnClick}>{children}</div>
    </Popover>
  );
};

const DropdownMenu = ({ items, style }) => {
  return (
    <div className="dropdown-menu" style={style}>
      {items.map((item, index) => (
        <DropdownItem
          key={index}
          content={item.content}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

const DropdownItem = ({ content, onClick }) => {
  return (
    <div className="dropdown-item" onClick={onClick}>
      {content}
    </div>
  );
};

export default Dropdown;
