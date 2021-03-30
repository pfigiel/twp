import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import ClickAwayListener from "features/common/components/ClickAwayListener";
import messages, { getTranslatedMessage } from "features/common/translations";
import { createBemGenerator } from "features/common/utils";
import { ChangeEvent, useRef, useState } from "react";
import { useIntl } from "react-intl";
import styles from "./styles.module.scss";

const defaultMaxInputLength = 100;

export type Props = {
    ["data-testid"]?: string;
    containerClassName?: string;
    label: string;
    value?: string;
    max?: number;
    error?: string;
    helperMessage?: string;
    required?: boolean;
    onChange: (value: string) => void;
    onBlur?: () => void;
} & (
    | {
          type?: "password";
          withPasswordLookup?: boolean;
      }
    | {
          type?: never;
          withPasswordLookup?: never;
      }
);

const Input = ({
    "data-testid": testId = "input",
    containerClassName,
    label,
    value,
    type,
    max = defaultMaxInputLength,
    error,
    helperMessage,
    required,
    withPasswordLookup,
    onChange,
    onBlur,
}: Props) => {
    const intl = useIntl();
    const bem = createBemGenerator("input");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [isFocused, setFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onLocalChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.currentTarget.value;

        if (text.length <= max) {
            onChange(event.currentTarget.value);
        }
    };

    const onLocalBlur = () => {
        setFocused(false);
        onBlur && onBlur();
    };

    const calculatedType = type === "password" && passwordVisible ? "text" : type;

    return (
        <ClickAwayListener onClickAway={() => setFocused(false)}>
            <div>
                <div
                    data-testid={`${testId}__container`}
                    className={classNames(
                        styles[bem("container")],
                        { [styles[bem("container", "focused")]]: isFocused },
                        { [styles[bem("container", "error")]]: !!error },
                        containerClassName
                    )}>
                    <label
                        data-testid={`${testId}__label`}
                        className={classNames(
                            styles[bem("label")],
                            {
                                [styles[bem("label", "floating")]]: isFocused || !!value,
                            },
                            {
                                [styles[bem("label", "focused")]]: isFocused,
                            }
                        )}
                        onClick={() => !isFocused && inputRef.current?.focus()}>
                        {`${label}${required ? "*" : ""}`}
                    </label>
                    <input
                        data-testid={testId}
                        className={classNames(styles[bem()])}
                        ref={inputRef}
                        value={value ?? ""}
                        type={calculatedType}
                        onChange={onLocalChange}
                        onFocus={() => setFocused(true)}
                        onBlur={onLocalBlur}
                    />
                    {withPasswordLookup && (
                        <div
                            className={styles[bem("password-lookup")]}
                            onClick={() => setPasswordVisible((prev) => !prev)}>
                            <FontAwesomeIcon
                                className={classNames({ [styles[bem("password-lookup-slash-icon")]]: passwordVisible })}
                                icon={passwordVisible ? faEyeSlash : faEye}
                            />
                        </div>
                    )}
                </div>
                {error ? (
                    <div className={classNames(styles[bem("message")], styles[bem("message", "error")])}>{error}</div>
                ) : helperMessage ? (
                    <div className={styles[bem("message")]}>{helperMessage}</div>
                ) : required ? (
                    <div className={styles[bem("message")]}>{`*${getTranslatedMessage(
                        messages.fieldRequired,
                        intl
                    )}`}</div>
                ) : (
                    <div className={styles[bem("message-placeholder")]} />
                )}
            </div>
        </ClickAwayListener>
    );
};

export default Input;
