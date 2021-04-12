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
import { useErrorNotification, useGlobalLoader } from "features/layout/hooks";
import messages from "features/user/translations";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router";
import styles from "./styles.module.scss";

export interface Props {
    signInLoading: boolean;
    signInSuccess?: boolean;
    signInError?: ApiError;
    signInAsync: (usernameOrEmail: string, password: string, cancelToken: CancelToken) => void;
    resetSignInState: () => void;
}

const SignIn = ({ signInLoading, signInSuccess, signInError, signInAsync, resetSignInState }: Props) => {
    const intl = useIntl();
    const history = useHistory();
    const bem = createBemGenerator("sign-in");
    const createCancelToken = useCreateCancelToken();

    useGlobalLoader(signInLoading);
    useErrorNotification(getTranslatedMessage(messages.signIn.error, intl), !!signInError);

    const [password, setPassword] = useState<string>("");
    const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");

    const onSignInClick = () => {
        if (!signInLoading) {
            signInAsync(usernameOrEmail, password, createCancelToken());
        }
    };

    useEffect(() => {
        if (signInSuccess) {
            resetSignInState();
            history.push(config.appRoutes.dashboard);
        }
    }, [signInSuccess, history, resetSignInState]);

    useEffect(() => () => resetSignInState(), [resetSignInState]);

    return (
        <div>
            <LayoutHeaderTile title={getTranslatedMessage(messages.signIn.signIn, intl)} />
            <LayoutTile className={styles[bem("tile")]}>
                <div className={styles[bem("content")]}>
                    <div>
                        <span>{getTranslatedMessage(messages.signIn.noAccountQuestion, intl)}</span>
                        <Button
                            className={styles[bem("sign-up-button")]}
                            variant="link"
                            onClick={() => history.push(config.appRoutes.signUp)}>
                            {getTranslatedMessage(messages.signIn.registerNow, intl)}
                        </Button>
                    </div>
                    <Input
                        label={getTranslatedMessage(messages.signIn.usernameOrEmail, intl)}
                        value={usernameOrEmail}
                        onChange={setUsernameOrEmail}
                    />
                    <Input
                        type="password"
                        label={getTranslatedMessage(messages.common.password, intl)}
                        value={password}
                        onChange={setPassword}
                    />
                    <Button className={styles[bem("submit-button")]} onClick={onSignInClick}>
                        {getTranslatedMessage(messages.signIn.signIn, intl)}
                    </Button>
                </div>
            </LayoutTile>
        </div>
    );
};

export default SignIn;
