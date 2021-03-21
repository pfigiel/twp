import config from "config";
import { getTranslatedMessage } from "features/common/translations";
import messages from "features/layout/translations";
import { useIntl } from "react-intl";
import { useHistory } from "react-router";
import styles from "./styles.module.scss";

const Footer = () => {
    const intl = useIntl();
    const history = useHistory();

    return (
        <div className={styles["footer"]}>
            <div className={styles["footer__top-part"]}>
                <span>{getTranslatedMessage(messages.footer.contactUs, intl)}</span>
                <span onClick={() => history.push(config.appRoutes.privacyPolicy)}>
                    {getTranslatedMessage(messages.footer.privacyPolicy, intl)}
                </span>
                <span onClick={() => history.push(config.appRoutes.regulations)}>
                    {getTranslatedMessage(messages.footer.regulations, intl)}
                </span>
            </div>
            <div className={styles["footer__bottom-part"]}>The Worship Project &copy; 2021</div>
        </div>
    );
};

export default Footer;
