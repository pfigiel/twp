import logo from "assets/images/logo.png";
import config from "config";
import { useDeviceClass } from "features/common/hooks";
import React from "react";
import { useHistory } from "react-router-dom";
import LocaleDropdown from "./LocaleDropdown";
import Navigation from "./Navigation";
import styles from "./styles.module.scss";

interface Props {
    ["data-testid"]?: string;
}

const Header = ({ "data-testid": testId = "header" }: Props) => {
    const history = useHistory();
    const deviceClass = useDeviceClass();

    return (
        <header className={styles["header"]}>
            <div className={styles["header__left-part"]}>
                {deviceClass === "desktop" && (
                    <div
                        data-testid={`${testId}__logo`}
                        className={styles["header__logo"]}
                        onClick={() => history.push(config.appRoutes.landingPage)}>
                        <img src={logo} alt="" />
                    </div>
                )}
                <Navigation deviceClass={deviceClass} />
            </div>
            <LocaleDropdown />
        </header>
    );
};

export default Header;
