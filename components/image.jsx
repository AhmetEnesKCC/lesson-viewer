import React, { useEffect, useRef, useState } from "react";
import { BsPeople, BsTrash } from "react-icons/bs";

const Image = ({ ondelete, onSubmit, id, defaultValue }) => {
  const inputRef = useRef(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    defaultValue && setUrl(defaultValue);
  }, []);

  const handleSubmit = () => {
    if (inputRef.current.value) {
      setUrl(inputRef.current.value);
    }
  };

  return (
    <div className="img" id={id}>
      <div className="delete" onClick={ondelete}>
        <BsTrash className="mx-auto" />
      </div>
      <div className="text-white text-xl my-2">URL</div>
      <input
        ref={inputRef}
        type="text"
        className="url"
        placeholder="Resim URL sini girin"
      />
      {url ? (
        <img className="w-full" alt="img" src={url} />
      ) : (
        <div className="preview">
          <BsPeople />
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          handleSubmit();
        }}
        className="submit"
      >
        Ekle
      </button>
    </div>
  );
};

export default Image;
