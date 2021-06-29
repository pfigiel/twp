import { DropdownOption } from "features/common/components/Dropdown";
import { getTranslatedMessage } from "features/common/translations";
import { createBemGenerator } from "features/common/utils";
import HeaderDropdown from "features/layout/components/Header/HeaderDropdown";
import messages from "features/layout/translations";
import { appRoutes } from "features/routing/constants";
import { SignOutHistoryState } from "features/user/types";
import { useIntl } from "react-intl";
import { useHistory } from "react-router";
import Identicon from "./Identicon";
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
                history.push(appRoutes.signOut, historyState);
        }
    };

    return (
        <div>
            {username ? (
                <HeaderDropdown
                    data-testid="user-section__user-dropdown"
                    optionsContainerClassName={styles[bem("user-dropdown-options")]}
                    options={options}
                    toggleContent={
                        <div className={styles[bem("dropdown-toggle-content")]}>
                            <span>{username}</span>
                            <Identicon seed={username} />
                        </div>
                    }
                    onSelect={handleOptionSelect}
                />
            ) : (
                <div className={styles[bem("sign-in-link")]} onClick={() => history.push(appRoutes.signIn)}>
                    {getTranslatedMessage(messages.header.signIn, intl)}
                </div>
            )}
        </div>
    );
};

export default UserSection;
