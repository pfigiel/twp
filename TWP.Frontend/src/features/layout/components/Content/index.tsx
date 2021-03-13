import { ReactElement } from "react";
import styles from "./styles.module.scss";

export interface Props {
    children: ReactElement;
}

const Content = ({ children }: Props) => (
    <div className={styles["content"]}>
        <div className={styles["content__middle-section"]}>{children}</div>
    </div>
);

export default Content;
