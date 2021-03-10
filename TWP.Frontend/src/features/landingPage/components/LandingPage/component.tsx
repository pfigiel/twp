import landingPageBackground from "assets/images/landingPageBackground.jpg";
import classNames from "classnames";
import config from "config";
import Button from "features/common/components/Button";
import Tile from "features/common/components/Tile";
import { getTranslatedMessage } from "features/common/translations";
import { Locale } from "features/common/types";
import messages from "features/landingPage/translations";
import Footer from "features/layout/components/Footer";
import { useIntl } from "react-intl";
import { useHistory } from "react-router";
import { loremIpsum } from "tests/utils";
import styles from "./styles.module.scss";

interface Props {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

const LandingPage = ({ locale, setLocale }: Props) => {
    const intl = useIntl();
    const history = useHistory();

    return (
        <div className={styles["landing-page"]}>
            <div className={styles["landing-page__content"]}>
                <Tile className={styles["landing-page__header-tile"]}>
                    <img className={styles["landing-page__header-tile-image"]} src={landingPageBackground} alt="" />
                    <div className={styles["landing-page__header-tile-language-links"]}>
                        <span
                            className={classNames(styles["landing-page__header-tile-language-link"], {
                                [styles["landing-page__header-tile-language-link--active"]]: locale === "en",
                            })}
                            onClick={() => setLocale("en")}>
                            EN
                        </span>
                        <span
                            className={classNames(styles["landing-page__header-tile-language-link"], {
                                [styles["landing-page__header-tile-language-link--active"]]: locale === "pl",
                            })}
                            onClick={() => setLocale("pl")}>
                            PL
                        </span>
                    </div>
                    <div className={styles["landing-page__header-tile-content"]}>
                        <h1 className={styles["landing-page__header-primary"]}>The Worship Project</h1>
                        <h2 className={styles["landing-page__header-secondary"]}>
                            {getTranslatedMessage(messages.titleSecondary, intl)}
                        </h2>
                        <Button
                            className={styles["landing-page__button"]}
                            variant="secondary"
                            onClick={() => history.push(config.appRoutes.dashboard)}>
                            {getTranslatedMessage(messages.goToDashboard, intl)}
                        </Button>
                    </div>
                </Tile>
                <Tile className={styles["landing-page__tile"]}>
                    <h1>Lorem ipsum</h1>
                    <div>{loremIpsum}</div>
                </Tile>
                <Tile className={classNames(styles["landing-page__tile"], styles["landing-page__tile--middle"])}>
                    <h1>Lorem ipsum</h1>
                    <div>{loremIpsum}</div>
                </Tile>
                <Tile className={styles["landing-page__tile"]}>
                    <h1>Lorem ipsum</h1>
                    <div>{loremIpsum}</div>
                </Tile>
            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;
