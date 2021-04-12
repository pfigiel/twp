import classNames from "classnames";
import styles from "./styles.module.scss";

export interface Props {
    ["data-testid"]?: string;
    className?: string;
}

const Loader = ({ "data-testid": testId, className }: Props) => (
    <div data-testid={testId} className={classNames(styles["loader"], className)} />
);

export default Loader;
