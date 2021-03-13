import classNames from "classnames";
import { ReactElement } from "react";
import styles from "./styles.module.scss";

export type Props = {
    ["data-testid"]?: string;
    className?: string;
    children: ReactElement | ReactElement[];
} & (
    | {
          clickable: true;
          onClick: () => void;
      }
    | {
          clickable?: never;
          onClick?: never;
      }
);

const Tile = ({ "data-testid": testId = "tile", className, children, clickable, onClick }: Props) => (
    <div
        data-testid={testId}
        className={classNames(styles["tile"], { [styles["tile--clickable"]]: clickable }, className)}
        onClick={onClick}>
        {children}
    </div>
);

export default Tile;
