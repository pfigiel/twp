import classNames from "classnames";
import ClickAwayListener from "features/common/components/ClickAwayListener";
import { useOnResizeListener } from "features/common/hooks";
import { createBemGenerator, numberToPixels } from "features/common/utils";
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
    optionsContainerClassName?: string;
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
    optionsContainerClassName,
    optionClassName,
    selectedOptionClassName,
    options,
    selectedOption,
    toggle,
    placeholder,
    onSelect,
    onToggle,
}: Props<T>) => {
    const bem = createBemGenerator("dropdown");

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
            <div data-testid={testId} className={classNames(styles[bem()], className)}>
                <div
                    data-testid={`${testId}__toggle`}
                    className={classNames(styles[bem("toggle")], toggleClassName)}
                    ref={toggleRef}
                    onClick={() => onLocalToggle(!expanded)}>
                    {toggle ?? selectedOption?.display ?? placeholder ?? ""}
                </div>
                <div className={classNames(styles[bem("options-container")], optionsContainerClassName)}>
                    <div
                        data-testid={`${testId}__options`}
                        className={classNames(
                            styles[bem("options")],
                            { [styles[bem("options", "hidden")]]: !expanded },
                            optionsClassName
                        )}
                        style={{ width: toggleWidth }}>
                        {options.map((option) => (
                            <div
                                key={`${option.value}`}
                                data-testid={`${testId}__option`}
                                className={classNames(
                                    styles[bem("option")],
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
