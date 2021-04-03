import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Dropdown, { DropdownOption } from "features/common/components/Dropdown";
import { createBemGenerator } from "features/common/utils";
import { ReactElement, useState } from "react";
import styles from "./styles.module.scss";

export interface Props<T> {
    ["data-testid"]?: string;
    className?: string;
    options: DropdownOption<T>[];
    toggleContent: string | ReactElement;
    selectedOption?: DropdownOption<T>;
    onSelect: (option: T) => void;
}

const HeaderDropdown = <T extends unknown>({
    "data-testid": testId = "header-dropdown",
    className,
    options,
    selectedOption,
    toggleContent,
    onSelect,
}: Props<T>) => {
    const bem = createBemGenerator("header-dropdown");

    const [expanded, setExpanded] = useState(false);

    return (
        <Dropdown
            data-testid={testId}
            className={classNames(styles[bem()], className)}
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
                    <span>{toggleContent}</span>
                </div>
            }
            onSelect={onSelect}
            onToggle={setExpanded}
        />
    );
};

export default HeaderDropdown;
