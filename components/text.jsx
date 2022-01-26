import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";

const Text = ({ ondelete, onSubmit, type, id, defaultValue }) => {
  const [value, setValue] = useState(value);

  useEffect(() => {
    defaultValue && setValue(defaultValue);
  }, []);

  return (
    <div className="text" id={id}>
      <div
        className="delete"
        onClick={() => {
          ondelete?.();
        }}
      >
        <BsTrash className="mx-auto" />
      </div>
      <textarea
        placeholder={
          type === "yazi"
            ? "Yazınızı ekleyin"
            : type === "h1"
            ? "Heading 1"
            : type === "h2"
            ? "Heading 2"
            : "Heading 3"
        }
        value={value}
        onChange={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight.toString() + "px";
        }}
        className={type}
      />
    </div>
  );
};

export default Text;
