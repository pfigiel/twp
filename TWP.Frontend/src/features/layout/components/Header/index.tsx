import logo from "assets/images/logo.png";
import { useDeviceClass } from "features/common/hooks";
import { createBemGenerator } from "features/common/utils";
import { appRoutes } from "features/routing/constants/routes";
import React from "react";
import { useHistory } from "react-router-dom";
import LoaderSection from "./LoaderSection";
import LocaleDropdown from "./LocaleDropdown";
import Navigation from "./Navigation";
import NotificationsSection from "./NotificationsSection";
import UserSection from "./UserSection";
import styles from "./styles.module.scss";

interface Props {
    ["data-testid"]?: string;
}

const Header = ({ "data-testid": testId = "header" }: Props) => {
    const bem = createBemGenerator("header");
    const history = useHistory();
    const deviceClass = useDeviceClass();

    return (
        <>
            <header className={styles[bem()]}>
                <div className={styles[bem("section")]}>
                    {deviceClass === "desktop" && (
                        <div
                            data-testid={`${testId}__logo`}
                            className={styles["header__logo"]}
                            onClick={() => history.push(appRoutes.landingPage)}>
                            <img src={logo} alt="" />
                        </div>
                    )}
                    <Navigation deviceClass={deviceClass} />
                </div>
                <div className={styles[bem("section")]}>
                    <LocaleDropdown />
                    <UserSection />
                </div>
            </header>
            <NotificationsSection />
            <LoaderSection />
        </>
    );
};

export default Header;
