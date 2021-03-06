import landingPageBackground from "assets/images/landingPageBackground.jpg";
import classNames from "classnames";
import config from "config";
import Button from "features/common/components/Button";
import Tile from "features/common/components/Tile";
import Footer from "features/layout/components/Footer";
import { useHistory } from "react-router";
import { loremIpsum } from "tests/utils";
import styles from "./styles.module.scss";

const LandingPage = () => {
    const history = useHistory();

    return (
        <div className={styles["landing-page"]}>
            <div className={styles["landing-page__content"]}>
                <Tile className={styles["landing-page__header-tile"]}>
                    <img className={styles["landing-page__header-tile-image"]} src={landingPageBackground} alt="" />
                    <div className={styles["landing-page__header-tile-content"]}>
                        <h1 className={styles["landing-page__header-primary"]}>The Worship Project</h1>
                        <h2 className={styles["landing-page__header-secondary"]}>Open worship songs database</h2>
                        <Button
                            className={styles["landing-page__button"]}
                            variant="secondary"
                            onClick={() => history.push(config.appRoutes.dashboard)}>
                            Go to dashboard
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
