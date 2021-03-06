import config from "config";
import styles from "./styles.module.scss";

const Header = () => (
    <div className={styles["header"]}>
        <a className={styles["header__brand"]} href={config.appRoutes.landingPage}>
            Lorem
        </a>
    </div>
);

export default Header;
