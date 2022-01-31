import React, { useEffect, useState } from "react";
import Header from "./header";
import Container from "./container";
import styles from "../styles/layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { parseCookies, setCookie } from "nookies";
import { setTheme } from "../Redux";

const Layout = ({ children }) => {
  const theme = useSelector((state) => state.theme);
  const notification = useSelector((state) => state.notification);
  const [openSite, setOPenSite] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const { lw_site_theme } = parseCookies();
    dispatch(setTheme(lw_site_theme === "true" ? "dark" : "light"));
  }, []);

  return (
    <div className={`${styles.layout} layout`} data-theme={theme}>
      <div
        style={{ top: openSite ? "0" : "-100vh" }}
        className="fixed w-screen h-screen  bg-black z-[9999] transition-all"
      >
        <IoMdClose
          onClick={() => {
            setOPenSite(false);
          }}
          className="text-white text-4xl mx-auto my-10 mb-4 cursor-pointer hover:bg-slate-500 bg-opacity-30 rounded-full transition-all p-1  "
        />
        <div className="text-white mb-2 pl-2">
          <a href="https://blockchaindemo.io/">
            Kaynak:
            <span className="text-purple-300"> https://blockchaindemo.io/</span>
          </a>
        </div>
        <iframe className="w-full h-[80vh] " src="https://blockchaindemo.io/" />
      </div>

      <Container className={styles.content}>
        <Header
          onToggle={() => {
            setOPenSite(!openSite);
          }}
        />

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
