import config from "config";
import { getTranslatedMessage } from "features/common/translations";
import { createBemGenerator } from "features/common/utils";
import messages from "features/layout/translations";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss";

interface Props {
    ["data-testid"]?: string;
}

const Footer = ({ "data-testid": testId = "footer" }: Props) => {
    const intl = useIntl();
    const history = useHistory();
    const bem = createBemGenerator("footer");

    return (
        <div className={styles[bem()]}>
            <div className={styles[bem("top-part")]}>
                {/* TODO: Implement redirect to contact form once it is implemented. */}
                <span data-testid={`${testId}__contact-us-link`}>
                    {getTranslatedMessage(messages.footer.contactUs, intl)}
                </span>
                <span
                    data-testid={`${testId}__privacy-policy-link`}
                    onClick={() => history.push(config.appRoutes.privacyPolicy)}>
                    {getTranslatedMessage(messages.footer.privacyPolicy, intl)}
                </span>
                <span
                    data-testid={`${testId}__regulations-link`}
                    onClick={() => history.push(config.appRoutes.regulations)}>
                    {getTranslatedMessage(messages.footer.regulations, intl)}
                </span>
            </div>
            <div className={styles[bem("bottom-part")]}>The Worship Project &copy; 2021</div>
        </div>
    );
};

export default Footer;
