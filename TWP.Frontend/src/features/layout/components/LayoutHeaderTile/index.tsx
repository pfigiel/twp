import LoadingTextPlaceholder from "features/common/components/LoadingTextPlaceholder";
import LayoutTile from "features/layout/components/LayoutTile";

export interface Props {
    ["data-testid"]?: string;
    title: string;
    isLoading?: boolean;
}

const LayoutHeaderTile = ({ "data-testid": testId = "layout-header-tile", title, isLoading }: Props) => (
    <LayoutTile data-testid={testId}>
        <h1 data-testid={`${testId}__title`}>{!isLoading ? title : <LoadingTextPlaceholder />}</h1>
    </LayoutTile>
);

export default LayoutHeaderTile;
