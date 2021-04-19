import classNames from "classnames";
import ClickAwayListener from "features/common/components/ClickAwayListener";
import { transitionTime } from "features/common/constants";
import { useDebounce } from "features/common/hooks";
import { getTranslatedMessage } from "features/common/translations";
import { createBemGenerator } from "features/common/utils";
import messages from "features/layout/translations";
import { appRoutes } from "features/routing/constants/routes";
import React from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router";
import styles from "./styles.module.scss";

interface Props {
    ["data-testid"]?: string;
    visible: boolean;
    setVisibility: (visible: boolean) => void;
}

const MobileDrawer = ({ "data-testid": testId, visible, setVisibility }: Props) => {
    const intl = useIntl();
    const history = useHistory();

    const bem = createBemGenerator("mobile-drawer");
    const debouncedVisible = useDebounce(visible, transitionTime);

    const onDashboardLinkClick = () => {
        history.push(appRoutes.dashboard);
        setVisibility(false);
    };

    const onSongsLinkClick = () => {
        history.push(appRoutes.songs);
        setVisibility(false);
    };

    const onCollectionsLinkClick = () => {
        history.push(appRoutes.collections);
        setVisibility(false);
    };

    const onEditorLinkClick = () => {
        history.push(appRoutes.editor);
        setVisibility(false);
    };

    return (
        <>
            <div
                className={classNames(styles[bem("backdrop")], {
                    [styles[bem("backdrop", "visible")]]: visible || debouncedVisible,
                })}
            />
            <ClickAwayListener onClickAway={() => setVisibility(false)}>
                <div className={classNames(styles[bem()], { [styles[bem(undefined, "visible")]]: visible })}>
                    <div data-testid={`${testId}__desktop-nav-link`} onClick={onDashboardLinkClick}>
                        {getTranslatedMessage(messages.header.dashboard, intl)}
                    </div>
                    <div data-testid={`${testId}__desktop-nav-link`} onClick={onSongsLinkClick}>
                        {getTranslatedMessage(messages.header.songs, intl)}
                    </div>
                    <div data-testid={`${testId}__desktop-nav-link`} onClick={onCollectionsLinkClick}>
                        {getTranslatedMessage(messages.header.collections, intl)}
                    </div>
                    <div data-testid={`${testId}__desktop-nav-link`} onClick={onEditorLinkClick}>
                        {getTranslatedMessage(messages.header.editor, intl)}
                    </div>
                </div>
            </ClickAwayListener>
        </>
    );
};

export default MobileDrawer;
