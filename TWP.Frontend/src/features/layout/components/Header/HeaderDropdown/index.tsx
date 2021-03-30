import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Dropdown, { DropdownOption } from "features/common/components/Dropdown";
import { createBemGenerator } from "features/common/utils";
import { useState } from "react";
import styles from "./styles.module.scss";

export interface Props<T> {
    ["data-testid"]?: string;
    options: DropdownOption<T>[];
    toggleText: string;
    selectedOption?: DropdownOption<T>;
    onSelect: (option: T) => void;
}

const HeaderDropdown = <T extends unknown>({
    "data-testid": testId = "header-dropdown",
    options,
    selectedOption,
    toggleText,
    onSelect,
}: Props<T>) => {
    const bem = createBemGenerator("header-dropdown");

    const [expanded, setExpanded] = useState(false);

    return (
        <Dropdown
            data-testid={testId}
            className={styles[bem()]}
            optionsClassName={classNames(styles[bem("options")])}
            optionClassName={styles[bem("option")]}
            selectedOptionClassName={styles[bem("option", "selected")]}
            options={options}
            selectedOption={selectedOption}
            toggle={
                <div className={styles[bem("toggle")]}>
                    <FontAwesomeIcon
                        data-testid={`${testId}__toggle-icon`}
                        className={classNames(styles[bem("toggle-icon")], {
                            [styles[bem("toggle-icon", "rotated")]]: expanded,
                        })}
                        icon={faChevronDown}
                    />
                    <span>{toggleText}</span>
                </div>
            }
            onSelect={onSelect}
            onToggle={setExpanded}
        />
    );
};

export default HeaderDropdown;
