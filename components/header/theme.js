import React, { useEffect, useState } from "react";
import { BsSun } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, toggleTheme } from "../../Redux";

const Theme = ({ className }) => {
  const [localTheme, setLocalTheme] = useState("dark");
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleTheme());
  };
  return (
    <div className={className} onClick={handleClick}>
      <div
        className={`transition-all bg-gray-500 flex items-center justify-center w-[20px] h-[20px] rounded-full absolute top-[4.2px] ${
          theme === "light" ? "right-1" : "right-[38px]"
        }`}
      >
        <BsSun
          className="icon stroke-[2px] text-sm transition-all"
          style={{ color: theme === "dark" ? "white" : "orange" }}
        />
      </div>
    </div>
  );
};

export default Theme;
