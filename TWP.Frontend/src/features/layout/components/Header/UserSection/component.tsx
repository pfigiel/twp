import config from "config";
import { DropdownOption } from "features/common/components/Dropdown";
import { getTranslatedMessage } from "features/common/translations";
import { createBemGenerator } from "features/common/utils";
import HeaderDropdown from "features/layout/components/Header/HeaderDropdown";
import messages from "features/layout/translations";
import { SignOutHistoryState } from "features/user/types";
import Blockies from "react-blockies";
import { useIntl } from "react-intl";
import { useHistory } from "react-router";
import styles from "./styles.module.scss";

enum SelectedOption {
    SignOut,
}

export interface Props {
    username?: string;
}

const UserSection = ({ username }: Props) => {
    const intl = useIntl();
    const history = useHistory();
    const bem = createBemGenerator("user-section");

    const options: DropdownOption<SelectedOption>[] = [
        {
            display: getTranslatedMessage(messages.header.signOut, intl),
            value: SelectedOption.SignOut,
        },
    ];

    const handleOptionSelect = (option: SelectedOption) => {
        switch (option) {
            case SelectedOption.SignOut:
                const historyState: SignOutHistoryState = {
                    previousRoute: `${history.location.pathname}${history.location.search}`,
                };
                history.push(config.appRoutes.signOut, historyState);
        }
    };

    return (
        <div>
            {username ? (
                <HeaderDropdown
                    data-testid="user-section__user-dropdown"
                    className={styles[bem("user-dropdown")]}
                    options={options}
                    toggleContent={
                        <div className={styles[bem("dropdown-toggle-content")]}>
                            <span>{username}</span>
                            <Blockies className={styles[bem("blockies")]} seed={username} scale={3} />
                        </div>
                    }
                    onSelect={handleOptionSelect}
                />
            ) : (
                <div className={styles[bem("sign-in-link")]} onClick={() => history.push(config.appRoutes.signIn)}>
                    {getTranslatedMessage(messages.header.signIn, intl)}
                </div>
            )}
        </div>
    );
};

export default UserSection;