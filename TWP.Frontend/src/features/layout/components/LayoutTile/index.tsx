import classNames from "classnames";
import Tile from "features/common/components/Tile";
import { ReactElement } from "react";
import styles from "./styles.module.scss";

export interface Props {
    ["data-testid"]?: string;
    className?: string;
    children: ReactElement | ReactElement[];
}

const LayoutTile = ({ "data-testid": testId = "layout-tile", className, children }: Props) => (
    <>
        <Tile data-testid={testId} className={classNames(styles["layout-tile"], className)}>
            {children}
        </Tile>
        <div className={styles["layout-tile__border"]} />
    </>
);

export default LayoutTile;
