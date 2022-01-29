import React from "react";
import Lang from "./lang";
import Theme from "./theme";
import styles from "./header.module.css";
import { ImClock2 } from "react-icons/im";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { hideNotification, setNotification } from "../../Redux";
import { route } from "next/dist/server/router";

const Header = ({ onToggle }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <div className="flex">
        <Lang className={styles.lang} />
        <Theme className={styles.theme} />
      </div>
      <div>
        {router.pathname !== "/write" ? (
          <Link href={"/write"}>
            <div className="bg-green-800 p-2 cursor-pointer">Yaziyorum</div>
          </Link>
        ) : (
          <Link href={"/"}>
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(
                  setNotification({
                    message: "Yaptiklarinizi kaydetmeyi unutmayin",
                    onAccept: () => {
                      dispatch(hideNotification());
                    },
                    onDecline: () => {
                      document.querySelector("#save-file").click();
                      router.push("/");
                      dispatch(hideNotification());
                    },
                  })
                );
              }}
              className="bg-green-800 p-2 cursor-pointer"
            >
              Ana Sayfa
            </div>
          </Link>
        )}
      </div>
      <div
        onClick={() => {
          onToggle?.();
        }}
        className="bg-purple-400 p-2 text-black cursor-pointer"
      >
        demo
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
