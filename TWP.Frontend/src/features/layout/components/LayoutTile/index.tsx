import Tile from "features/common/components/Tile";
import { ReactElement } from "react";

export interface Props {
    children: ReactElement | ReactElement[];
}

const LayoutTile = ({ children }: Props) => <Tile>{children}</Tile>;

export default LayoutTile;
