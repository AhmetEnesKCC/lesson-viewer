import React from "react";
import Header from "./header";
import Container from "./container";
import styles from "../styles/layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Container className={styles.content}>
        <Header />
        {children}
      </Container>
    </div>
  );
};

export default Layout;
