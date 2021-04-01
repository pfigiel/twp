import classNames from "classnames";
import styles from "./styles.module.scss";

export interface Props {
    className?: string;
}

const Loader = ({ className }: Props) => <div className={classNames(styles["loader"], className)} />;

export default Loader;
