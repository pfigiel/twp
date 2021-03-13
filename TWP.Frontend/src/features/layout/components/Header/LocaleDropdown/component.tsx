import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Dropdown, { DropdownOption } from "features/common/components/Dropdown";
import { Locale } from "features/common/types";
import React, { useState } from "react";
import styles from "./styles.module.scss";

export interface Props {
    ["data-testid"]?: string;
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

const LocaleDropdown = ({ "data-testid": testId = "locale-dropdown", locale, setLocale }: Props) => {
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
        <Dropdown
            data-testid={testId}
            className={styles["locale-dropdown"]}
            optionsClassName={classNames(styles["locale-dropdown__options"])}
            optionClassName={styles["locale-dropdown__option"]}
            selectedOptionClassName={styles["locale-dropdown__option--selected"]}
            options={localeDropdownOptions}
            selectedOption={selectedOption}
            toggle={
                <div className={styles["locale-dropdown__toggle"]}>
                    <FontAwesomeIcon
                        data-testid={`${testId}__toggle-icon`}
                        className={classNames(styles["locale-dropdown__toggle-icon"], {
                            [styles["locale-dropdown__toggle-icon--rotated"]]: languageDropdownExpanded,
                        })}
                        icon={faChevronDown}
                    />
                    <span>{selectedOption.display}</span>
                </div>
            }
            onSelect={setLocale}
            onToggle={setLanguageDropdownExpanded}
        />
    );
};

export default LocaleDropdown;
