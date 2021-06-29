import { getTranslatedMessage } from "features/common/translations";
import { DeviceClass } from "features/common/types";
import { createBemGenerator } from "features/common/utils";
import messages from "features/layout/translations";
import { appRoutes } from "features/routing/constants";
import { useState } from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import MobileDrawer from "./MobileDrawer";
import styles from "./styles.module.scss";

export interface Props {
    ["data-testid"]?: string;
    deviceClass: DeviceClass;
}

// TODO: add proper redirects once the pages are implemented.
const Navigation = ({ "data-testid": testId = "navigation", deviceClass }: Props) => {
    const intl = useIntl();
    const history = useHistory();
    const bem = createBemGenerator("navigation");

    const [isMobileDrawerVisible, setMobileDrawerVisible] = useState(false);

    const onMobileDrawerToggleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setMobileDrawerVisible(true);
    };

    return (
        <div className={styles[bem()]}>
            {deviceClass === "desktop" ? (
                <div data-testid={`${testId}__desktop-nav-links`} className={styles[bem("nav-links")]}>
                    <span data-testid={`${testId}__desktop-nav-link`} onClick={() => history.push(appRoutes.dashboard)}>
                        {getTranslatedMessage(messages.header.dashboard, intl)}
                    </span>
                    <span data-testid={`${testId}__desktop-nav-link`} onClick={() => history.push(appRoutes.songs)}>
                        {getTranslatedMessage(messages.header.songs, intl)}
                    </span>
                    <span
                        data-testid={`${testId}__desktop-nav-link`}
                        onClick={() => history.push(appRoutes.collections)}>
                        {getTranslatedMessage(messages.header.collections, intl)}
                    </span>
                    <span data-testid={`${testId}__desktop-nav-link`} onClick={() => history.push(appRoutes.editor)}>
                        {getTranslatedMessage(messages.header.editor, intl)}
                    </span>
                </div>
            ) : (
                <>
                    <div className={styles[bem("hamburger-icon")]} onClick={onMobileDrawerToggleClick}>
                        <div />
                        <div />
                        <div />
                    </div>
                    <MobileDrawer visible={isMobileDrawerVisible} setVisibility={setMobileDrawerVisible} />
                </>
            )}
        </div>
    );
};

export default Navigation;
