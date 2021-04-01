import { useCreateCancelToken } from "api/hooks";
import { ApiError } from "api/types";
import { CancelToken } from "axios";
import config from "config";
import Button from "features/common/components/Button";
import Input from "features/common/components/Input";
import { getTranslatedMessage } from "features/common/translations";
import { createBemGenerator } from "features/common/utils";
import LayoutHeaderTile from "features/layout/components/LayoutHeaderTile";
import LayoutTile from "features/layout/components/LayoutTile";
import { useErrorNotification, useGlobalLoader, useSuccessNotification } from "features/layout/hooks";
import { SignUpRequestDto } from "features/user/dtos";
import messages from "features/user/translations";
import { isEmailValid, isPasswordValid, isUsernameValid } from "features/user/validators";
import React, { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss";

const availabilityCheckTimeoutMs = 1000;

export interface Props {
    signUpLoading: boolean;
    signUpSuccess?: boolean;
    signUpError?: ApiError;
    isEmailAvailable?: boolean;
    isUsernameAvailable?: boolean;
    signUpAsync: (dto: SignUpRequestDto, cancelToken: CancelToken) => void;
    checkEmailAvailabilityAsync: (email: string, cancelToken: CancelToken) => void;
    checkUsernameAvailabilityAsync: (username: string, cancelToken: CancelToken) => void;
    resetSignUpState: () => void;
}

const SignUp = ({
    signUpLoading,
    signUpSuccess,
    signUpError,
    isEmailAvailable,
    isUsernameAvailable,
    signUpAsync,
    checkEmailAvailabilityAsync,
    checkUsernameAvailabilityAsync,
    resetSignUpState,
}: Props) => {
    const intl = useIntl();
    const history = useHistory();
    const bem = createBemGenerator("sign-up");
    const createCancelToken = useCreateCancelToken();

    useGlobalLoader(signUpLoading);
    useErrorNotification(getTranslatedMessage(messages.signUp.signUpError, intl), !!signUpError);
    useSuccessNotification(getTranslatedMessage(messages.signUp.signUpSuccess, intl), signUpSuccess);

    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>();
    const [emailTouched, setEmailTouched] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [usernameError, setUsernameError] = useState<string>();
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>();
    const [passwordTouched, setPasswordTouched] = useState(false);

    const onEmailChange = (email: string) => {
        setEmail(email);
        validateEmail(email);
    };

    const onUsernameChange = (username: string) => {
        setUsername(username);
        validateUsername(username);
    };

    const onPasswordChange = (password: string) => {
        setPassword(password);
        validatePassword(password);
    };

    const onEmailBlur = () => {
        setEmailTouched(true);
    };

    const onUsernameBlur = () => {
        setUsernameTouched(true);
    };

    const onPasswordBlur = () => {
        setPasswordTouched(true);
    };

    const validateEmail = useCallback(
        (email?: string) => {
            if (!isEmailValid(email)) {
                setEmailError(getTranslatedMessage(messages.signUp.emailFormatError, intl));
            } else {
                setEmailError(undefined);
            }
        },
        [intl]
    );

    const validateUsername = useCallback(
        (username?: string) => {
            if (!isUsernameValid(username)) {
                setUsernameError(getTranslatedMessage(messages.signUp.usernameFormatError, intl));
            } else {
                setUsernameError(undefined);
            }
        },
        [intl]
    );

    const validatePassword = useCallback(
        (password?: string) => {
            if (!isPasswordValid(password)) {
                setPasswordError(getTranslatedMessage(messages.signUp.passwordError, intl));
            } else {
                setPasswordError(undefined);
            }
        },
        [intl]
    );

    const onSignUpClick = () => {
        setEmailTouched(true);
        setUsernameTouched(true);
        setPasswordTouched(true);

        if (!emailError && !usernameError && !passwordError) {
            signUpAsync({ email, username, password }, createCancelToken());
        }
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (!!email && !emailError) {
            timeout = setTimeout(
                () => checkEmailAvailabilityAsync(email, createCancelToken()),
                availabilityCheckTimeoutMs
            );

            return () => clearTimeout(timeout);
        }
    }, [checkEmailAvailabilityAsync, createCancelToken, email, emailError]);

    useEffect(() => {
        if (isEmailAvailable === false) {
            setEmailError(getTranslatedMessage(messages.signUp.emailTakenError, intl));
        }
    }, [intl, isEmailAvailable]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (!!username && !usernameError) {
            timeout = setTimeout(
                () => checkUsernameAvailabilityAsync(username, createCancelToken()),
                availabilityCheckTimeoutMs
            );

            return () => clearTimeout(timeout);
        }
    }, [checkUsernameAvailabilityAsync, createCancelToken, username, usernameError]);

    useEffect(() => {
        if (isUsernameAvailable === false) {
            setUsernameError(getTranslatedMessage(messages.signUp.usernameTakenError, intl));
        }
    }, [intl, isUsernameAvailable]);

    useEffect(() => {
        if (signUpSuccess) {
            history.push(config.appRoutes.signIn);
        }
    });

    useEffect(() => {
        validateEmail();
        validateUsername();
        validatePassword();
    }, [validateEmail, validatePassword, validateUsername]);

    useEffect(() => () => resetSignUpState(), [resetSignUpState]);

    return (
        <div>
            <LayoutHeaderTile title={getTranslatedMessage(messages.signUp.signUp, intl)} />
            <LayoutTile className={styles[bem("tile")]}>
                <div className={styles[bem("content")]}>
                    <div>
                        <span>{getTranslatedMessage(messages.signUp.alreadyHaveAccountQuestion, intl)}</span>
                        <Button
                            className={styles[bem("sign-up-button")]}
                            variant="link"
                            onClick={() => history.push(config.appRoutes.signIn)}>
                            {getTranslatedMessage(messages.signUp.signIn, intl)}
                        </Button>
                    </div>
                    <Input
                        required
                        label={getTranslatedMessage(messages.signUp.email, intl)}
                        value={email}
                        error={emailTouched ? emailError : undefined}
                        onChange={onEmailChange}
                        onBlur={onEmailBlur}
                    />
                    <Input
                        required
                        label={getTranslatedMessage(messages.signUp.username, intl)}
                        value={username}
                        error={usernameTouched ? usernameError : undefined}
                        onChange={onUsernameChange}
                        onBlur={onUsernameBlur}
                    />
                    <Input
                        required
                        type="password"
                        withPasswordLookup
                        label={getTranslatedMessage(messages.common.password, intl)}
                        value={password}
                        error={passwordTouched ? passwordError : undefined}
                        onChange={onPasswordChange}
                        onBlur={onPasswordBlur}
                    />
                    <Button className={styles[bem("submit-button")]} onClick={onSignUpClick}>
                        {getTranslatedMessage(messages.signUp.signUp, intl)}
                    </Button>
                </div>
            </LayoutTile>
        </div>
    );
};

export default SignUp;
