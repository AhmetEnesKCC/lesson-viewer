import React, { useEffect } from "react";
import Header from "./header";
import Container from "./container";
import styles from "../styles/layout.module.css";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const theme = useSelector((state) => state.theme);

  return (
    <div className={`${styles.layout} layout`} data-theme={theme}>
      <Container className={styles.content}>
        <Header />
        {children}
      </Container>
    </div>
  );
};

export default Layout;
