import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";

const HR = ({ ondelete, onSubmit, type, id }) => {
  const [value, setValue] = useState(value);

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
      <div className="hr">
        <div>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default HR;
