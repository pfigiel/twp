import { getTranslatedMessage } from "features/common/translations";
import messages from "features/layout/translations";
import { useIntl } from "react-intl";
import styles from "./styles.module.scss";

const Footer = () => {
    const intl = useIntl();

    return (
        <div className={styles["footer"]}>
            <div className={styles["footer__top-part"]}>
                <span>{getTranslatedMessage(messages.contactUs, intl)}</span>
                <span>{getTranslatedMessage(messages.privacyPolicy, intl)}</span>
                <span>{getTranslatedMessage(messages.regulations, intl)}</span>
            </div>
            <div className={styles["footer__bottom-part"]}>The Worship Project &copy; 2021</div>
        </div>
    );
};

export default Footer;
