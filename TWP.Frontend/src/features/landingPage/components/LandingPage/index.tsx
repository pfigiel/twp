import config from "config";
import { useHistory } from "react-router";
import styles from "./styles.module.scss";

const LandingPage = () => {
    const history = useHistory();

    return (
        <div className={styles["landing-page"]}>
            <div className={styles["landing-page__content"]}>
                <div className={styles["landing-page__header-tile"]}>
                    <h1 className={styles["landing-page__header-primary"]}>The Worship Project</h1>
                    <h2 className={styles["landing-page__header-secondary"]}>Open worship songs database</h2>
                    <button onClick={() => history.push(config.appRoutes.dashboard)}>Go to dashboard</button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
