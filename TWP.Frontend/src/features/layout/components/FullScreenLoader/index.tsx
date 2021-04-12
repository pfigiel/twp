import { ReactComponent as OctagonIcon } from "assets/icons/octagon.svg";
import { getTranslatedMessage } from "features/common/translations";
import { createBemGenerator } from "features/common/utils";
import messages from "features/layout/translations";
import { useIntl } from "react-intl";
import styles from "./styles.module.scss";

interface Props {
    ["data-testid"]?: string;
}

const FullScreenLoader = ({ "data-testid": testId }: Props) => {
    const intl = useIntl();
    const bem = createBemGenerator("full-screen-loader");

    return (
        <div data-testid={testId} className={styles[bem()]}>
            <div className={styles[bem("center-content")]}>
                <OctagonIcon className={styles[bem("octagon")]} />
                <div className={styles[bem("twp")]}>TWP</div>
                <div className={styles[bem("loading-text")]}>
                    {getTranslatedMessage(messages.fullScreenLoader.loading, intl)}...
                </div>
            </div>
        </div>
    );
};

export default FullScreenLoader;
