import { useCreateCancelToken } from "api/hooks";
import { ApiError } from "api/types";
import { CancelToken } from "axios";
import { useGlobalLoader } from "features/layout/hooks";
import { SignOutHistoryState } from "features/user/types";
import { useEffect } from "react";
import { useHistory } from "react-router";

export interface Props {
    signOutLoading: boolean;
    signOutFinished?: boolean;
    signOutError?: ApiError;
    signOutAsync: (cancelToken: CancelToken) => void;
    resetSignOutState: () => void;
}

const SignOut = ({ signOutLoading, signOutFinished, signOutAsync, resetSignOutState }: Props) => {
    useGlobalLoader(signOutLoading);

    const history = useHistory();
    const createCancelToken = useCreateCancelToken();
    const historyState = history.location.state as SignOutHistoryState;

    useEffect(() => {
        signOutAsync(createCancelToken());
    }, [createCancelToken, history, historyState.previousRoute, signOutAsync]);

    useEffect(() => {
        if (signOutFinished) {
            historyState?.previousRoute && window.location.replace(historyState.previousRoute);
        }
    }, [history, historyState.previousRoute, signOutFinished]);

    useEffect(() => () => resetSignOutState(), [resetSignOutState]);

    return null;
};

export default SignOut;
