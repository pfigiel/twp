import Content from "features/layout/components/Content";
import Footer from "features/layout/components/Footer";
import Header from "features/layout/components/Header";
import React, { ReactElement } from "react";
import styles from "./styles.module.scss";

interface Props {
    children: ReactElement;
}

const Page = ({ children }: Props) => (
    <div className={styles["page"]}>
        <Header />
        <Content>{children}</Content>
        <Footer />
    </div>
);

export default Page;
