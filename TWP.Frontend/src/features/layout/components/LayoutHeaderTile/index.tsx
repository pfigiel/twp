import LayoutTile from "features/layout/components/LayoutTile";
import { ReactElement } from "react";

export interface Props {
    ["data-testid"]?: string;
    title: string;
    content?: ReactElement;
}

const LayoutHeaderTile = ({ "data-testid": testId = "layout-header-tile", title, content }: Props) => (
    <LayoutTile data-testid={testId}>
        <h1 data-testid={`${testId}__title`}>{title}</h1>
        <>{content}</>
    </LayoutTile>
);

export default LayoutHeaderTile;
