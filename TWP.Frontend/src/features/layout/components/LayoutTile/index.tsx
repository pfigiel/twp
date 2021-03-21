import Tile from "features/common/components/Tile";
import { ReactElement } from "react";
import styles from "./styles.module.scss";

export interface Props {
    ["data-testid"]?: string;
    children: ReactElement | ReactElement[];
}

const LayoutTile = ({ "data-testid": testId = "layout-tile", children }: Props) => (
    <Tile data-testid={testId} className={styles["layout-tile"]}>
        {children}
    </Tile>
);

export default LayoutTile;
