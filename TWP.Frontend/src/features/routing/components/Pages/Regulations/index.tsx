import { getTranslatedMessage } from "features/common/translations";
import LayoutHeaderTile from "features/layout/components/LayoutHeaderTile";
import LayoutTile from "features/layout/components/LayoutTile";
import messages from "features/routing/translations";
import { useIntl } from "react-intl";
import { loremIpsum } from "tests/utils";

const Regulations = () => {
    const intl = useIntl();

    return (
        <div>
            <LayoutHeaderTile title={getTranslatedMessage(messages.regulations.header, intl)} />
            <LayoutTile>
                <>
                    {loremIpsum} {loremIpsum}
                </>
            </LayoutTile>
        </div>
    );
};

export default Regulations;
