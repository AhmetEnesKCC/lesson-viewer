import React, { useEffect } from "react";
import Header from "./header";
import Container from "./container";
import styles from "../styles/layout.module.css";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const theme = useSelector((state) => state.theme);
  const notification = useSelector((state) => state.notification);

  return (
    <div className={`${styles.layout} layout`} data-theme={theme}>
      <Container className={styles.content}>
        <Header />
        {notification && (
          <div className="w-screen h-screen bg-black bg-opacity-80 fixed top-0 left-0 z-[999]">
            <div className="absolute top-1/2 left-1/2 px-[30px] py-[20px] bg-[black] border-2 border-orange-500 transfrom -translate-y-1/2 -translate-x-1/2 flex items-start justify-center flex-col">
              <div className="text-orange-400 font-maven text-2xl mb-10">
                Uyarı
              </div>
              <div className="text-orange-400">{notification.message}</div>
              <button
                onClick={notification.onAccept}
                className="text-white bg-red-400 mt-2 p-2"
              >
                Yazmaya devam et
              </button>
              <button
                onClick={notification.onDecline}
                className="bg-purple-400 text-white my-2 p-2"
              >
                Kaydet ve git
              </button>
            </div>
          </div>
        )}

        {children}
      </Container>
    </div>
  );
};

export default Layout;
