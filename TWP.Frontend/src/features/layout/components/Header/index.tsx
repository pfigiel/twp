import config from "config";
import { useHistory } from "react-router-dom";
import LocaleDropdown from "./LocaleDropdown";
import styles from "./styles.module.scss";

interface Props {
    ["data-testid"]?: string;
}

const Header = ({ "data-testid": testId = "header" }: Props) => {
    const history = useHistory();

    return (
        <header className={styles["header"]}>
            <div
                data-testid={`${testId}__brand`}
                className={styles["header__brand"]}
                onClick={() => history.push(config.appRoutes.landingPage)}>
                Lorem
            </div>
            <LocaleDropdown />
        </header>
    );
};

export default Header;
