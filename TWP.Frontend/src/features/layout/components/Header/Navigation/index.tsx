import config from "config";
import Dropdown, { DropdownOption } from "features/common/components/Dropdown";
import { getTranslatedMessage } from "features/common/translations";
import { DeviceClass } from "features/common/types";
import messages from "features/layout/translations";
import { useIntl } from "react-intl";
import { useHistory } from "react-router";
import styles from "./styles.module.scss";

export interface Props {
    ["data-testid"]?: string;
    deviceClass: DeviceClass;
}

// TODO: add proper redirects once the pages are implemented.
const Navigation = ({ "data-testid": testId = "navigation", deviceClass }: Props) => {
    const intl = useIntl();
    const history = useHistory();

    const dropdownOptions: DropdownOption<string>[] = [
        {
            display: getTranslatedMessage(messages.header.dashboard, intl),
            value: config.appRoutes.dashboard,
        },
        {
            display: getTranslatedMessage(messages.header.songs, intl),
            value: config.appRoutes.songs,
        },
        {
            display: getTranslatedMessage(messages.header.collections, intl),
            value: config.appRoutes.myCollections,
        },
        {
            display: getTranslatedMessage(messages.header.editor, intl),
            value: config.appRoutes.songCreator,
        },
    ];

    return (
        <div className={styles["navigation"]}>
            {deviceClass === "desktop" ? (
                <div data-testid={`${testId}__desktop-nav-links`} className={styles["navigation__nav-links"]}>
                    <span
                        data-testid={`${testId}__desktop-nav-link`}
                        onClick={() => history.push(config.appRoutes.dashboard)}>
                        {getTranslatedMessage(messages.header.dashboard, intl)}
                    </span>
                    <span
                        data-testid={`${testId}__desktop-nav-link`}
                        onClick={() => history.push(config.appRoutes.songs)}>
                        {getTranslatedMessage(messages.header.songs, intl)}
                    </span>
                    <span
                        data-testid={`${testId}__desktop-nav-link`}
                        onClick={() => history.push(config.appRoutes.dashboard)}>
                        {getTranslatedMessage(messages.header.collections, intl)}
                    </span>
                    <span
                        data-testid={`${testId}__desktop-nav-link`}
                        onClick={() => history.push(config.appRoutes.dashboard)}>
                        {getTranslatedMessage(messages.header.editor, intl)}
                    </span>
                </div>
            ) : (
                <Dropdown
                    data-testid={`${testId}__nav-dropdown`}
                    className={styles["navigation__dropdown"]}
                    optionsClassName={styles["navigation__dropdown-options"]}
                    optionClassName={styles["navigation__dropdown-option"]}
                    options={dropdownOptions}
                    toggle={
                        <div className={styles["navigation__hamburger-icon"]}>
                            <div />
                            <div />
                            <div />
                        </div>
                    }
                    onSelect={(route) => history.push(route)}
                />
            )}
        </div>
    );
};

export default Navigation;
