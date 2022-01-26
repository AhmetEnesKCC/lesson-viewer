import React from "react";
import Lang from "./lang";
import Theme from "./theme";
import styles from "./header.module.css";
import { ImClock2 } from "react-icons/im";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="flex">
        <Lang className={styles.lang} />
        <Theme className={styles.theme} />
      </div>
      <div
        className="w-max space-x-6 flex justify-between items-center text-lg"
        style={{ color: "#949494" }}
      >
        <ImClock2 />
        <div className="flex justify-between w-max">
          {`${new Date().getDate()}.0${
            new Date().getMonth() + 1
          }.${new Date().getFullYear()}`}
        </div>
      </div>
    </header>
  );
};

export default Header;
