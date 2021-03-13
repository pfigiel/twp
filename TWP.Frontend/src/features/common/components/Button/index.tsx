import classNames from "classnames";
import { ReactElement } from "react";
import styles from "./styles.module.scss";

type ButtonVariant = "primary" | "secondary";

export interface Props {
    ["data-testid"]?: string;
    className?: string;
    children: ReactElement | ReactElement[] | string;
    variant?: ButtonVariant;
    onClick: () => void;
}

const Button = ({ "data-testid": testId = "button", className, children, variant = "primary", onClick }: Props) => (
    <button
        data-testid={testId}
        className={classNames(styles["button"], { [styles["button--secondary"]]: variant === "secondary" }, className)}
        onClick={onClick}>
        {children}
    </button>
);

export default Button;
