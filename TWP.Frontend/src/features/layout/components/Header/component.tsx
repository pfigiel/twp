import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import config from "config";
import Dropdown, { DropdownOption } from "features/common/components/Dropdown";
import { Locale } from "features/common/types";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss";

interface Props {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

const Header = ({ locale, setLocale }: Props) => {
    const history = useHistory();

    const [languageDropdownExpanded, setLanguageDropdownExpanded] = useState(false);

    const localeDropdownOptions: DropdownOption<Locale>[] = [
        {
            display: "EN",
            value: "en",
        },
        {
            display: "PL",
            value: "pl",
        },
    ];

    const selectedOption = localeDropdownOptions.find((option) => option.value === locale)!;

    return (
        <div className={styles["header"]}>
            <div className={styles["header__brand"]} onClick={() => history.push(config.appRoutes.landingPage)}>
                Lorem
            </div>
            <Dropdown
                className={styles["header__language-dropdown"]}
                optionsClassName={classNames(styles["header__language-dropdown-options"], {
                    [styles["header__language-dropdown-options--expanded"]]: languageDropdownExpanded,
                })}
                optionClassName={styles["header__language-dropdown-option"]}
                selectedOptionClassName={styles["header__language-dropdown-option--selected"]}
                options={localeDropdownOptions}
                selectedOption={selectedOption}
                toggle={
                    <div className={styles["header__language-dropdown-toggle"]}>
                        <FontAwesomeIcon
                            className={classNames(styles["header__language-dropdown-toggle-icon"], {
                                [styles["header__language-dropdown-toggle-icon--rotated"]]: languageDropdownExpanded,
                            })}
                            icon={faChevronDown}
                        />
                        <span>{selectedOption.display}</span>
                    </div>
                }
                onSelect={setLocale}
                onToggle={setLanguageDropdownExpanded}
            />
        </div>
    );
};

export default Header;
