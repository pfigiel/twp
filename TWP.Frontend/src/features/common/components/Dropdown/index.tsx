import classNames from "classnames";
import ClickAwayListener from "features/common/components/ClickAwayListener";
import { useOnResizeListener } from "features/common/hooks";
import { numberToPixels } from "features/common/utils";
import { ReactElement, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

export interface DropdownOption<T> {
    display: string | ReactElement;
    value: T;
}

export interface Props<T> {
    ["data-testid"]?: string;
    className?: string;
    toggleClassName?: string;
    optionsClassName?: string;
    optionClassName?: string;
    selectedOptionClassName?: string;
    options: DropdownOption<T>[];
    selectedOption?: DropdownOption<T>;
    toggle?: string | ReactElement;
    placeholder?: string;
    onSelect: (value: T) => void;
    onToggle?: (expanded: boolean) => void;
}

const Dropdown = <T extends unknown>({
    "data-testid": testId = "dropdown",
    className,
    toggleClassName,
    optionsClassName,
    optionClassName,
    selectedOptionClassName,
    options,
    selectedOption,
    toggle,
    placeholder,
    onSelect,
    onToggle,
}: Props<T>) => {
    const toggleRef = useRef<HTMLDivElement | null>(null);

    const [expanded, setExpanded] = useState(false);
    const [toggleWidth, setToggleWidth] = useState("");

    useOnResizeListener(() => setToggleWidth(numberToPixels(toggleRef.current?.offsetWidth ?? 0)));

    const onLocalToggle = (expanded: boolean) => {
        setExpanded(expanded);
        onToggle && onToggle(expanded);
    };

    const onLocalSelect = (value: T) => {
        onLocalToggle(false);
        onSelect(value);
    };

    useEffect(() => {
        setToggleWidth(numberToPixels(toggleRef.current?.offsetWidth ?? 0));
    }, [expanded]);

    useEffect(() => {
        setTimeout(() => numberToPixels(toggleRef.current?.offsetWidth ?? 0));
    }, []);

    return (
        <ClickAwayListener onClickAway={() => onLocalToggle(false)}>
            <div data-testid={testId} className={classNames(styles["dropdown"], className)}>
                <div
                    data-testid={`${testId}__toggle`}
                    className={classNames(styles["dropdown__toggle"], toggleClassName)}
                    ref={toggleRef}
                    onClick={() => onLocalToggle(!expanded)}>
                    {toggle ?? selectedOption?.display ?? placeholder ?? ""}
                </div>
                <div className={styles["dropdown__options-container"]}>
                    <div
                        data-testid={`${testId}__options`}
                        className={classNames(
                            styles["dropdown__options"],
                            { [styles["dropdown__options--hidden"]]: !expanded },
                            optionsClassName
                        )}
                        style={{ width: toggleWidth }}>
                        {options.map((option) => (
                            <div
                                key={`${option.value}`}
                                data-testid={`${testId}__option`}
                                className={classNames(
                                    styles["dropdown__option"],
                                    option.value === selectedOption?.value && selectedOptionClassName,
                                    optionClassName
                                )}
                                onClick={() => onLocalSelect(option.value)}>
                                {option.display}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    );
};

export default Dropdown;
