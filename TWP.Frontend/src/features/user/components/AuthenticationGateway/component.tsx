import { useCreateCancelToken } from "api/hooks";
import { CancelToken } from "axios";
import { usePrevious } from "features/common/hooks";
import FullScreenLoader from "features/layout/components/FullScreenLoader";
import { getRefreshTokenFromStorage } from "features/user/utils";
import React, { ReactElement, useEffect, useState } from "react";

export interface Props {
    children: ReactElement;
    verifyTokenLoading: boolean;
    verifyTokenAsync: (cancelToken: CancelToken) => void;
}

const AuthenticationGateway = ({ children, verifyTokenLoading, verifyTokenAsync }: Props) => {
    const createCancelToken = useCreateCancelToken();
    const previousVerifyTokenLoading = usePrevious(verifyTokenLoading);

    const [authenticationPerformed, setAuthenticationPerformed] = useState(!getRefreshTokenFromStorage());

    useEffect(() => {
        if (!!getRefreshTokenFromStorage()) {
            verifyTokenAsync(createCancelToken());
        }
    }, [createCancelToken, verifyTokenAsync]);

    useEffect(() => {
        if (!verifyTokenLoading && previousVerifyTokenLoading) {
            setAuthenticationPerformed(true);
        }
    }, [previousVerifyTokenLoading, verifyTokenLoading]);

    return <>{authenticationPerformed && !verifyTokenLoading ? children : <FullScreenLoader />}</>;
};

export default AuthenticationGateway;
