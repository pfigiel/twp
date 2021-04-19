import { apiRoutes } from "api/constants";
import { ApiException } from "api/types";
import axios, { AxiosError, AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from "axios";
import { RefreshTokenResponseDto } from "features/user/dtos";
import {
    getAccessTokenFromStorage,
    getRefreshTokenFromStorage,
    resetTokensInStorage,
    setTokensInStorage,
} from "features/user/utils";

type AxiosRequestConfigWithRetry = AxiosRequestConfig & {
    retried: boolean;
};

export const appendAuthHeaderInterceptor = (requestConfig: AxiosRequestConfig) => {
    const token = getAccessTokenFromStorage();

    if (token) {
        return Object.assign({}, requestConfig, {
            headers: { ...requestConfig.headers, authorization: `Bearer ${token}` },
        });
    }

    return requestConfig;
};

export const refreshTokenInterceptor = (
    instance: AxiosInstance
): Parameters<AxiosInterceptorManager<AxiosResponse>["use"]> => [
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        if (!error) {
            return Promise.reject();
        }

        const originalRequest = error.config as AxiosRequestConfigWithRetry;
        const refreshToken = getRefreshTokenFromStorage();

        if (originalRequest?.url?.includes(apiRoutes.identity.refreshToken)) {
            resetTokensInStorage();
        }

        if (refreshToken && !originalRequest.retried) {
            originalRequest.retried = true;

            const result = await instance.post(apiRoutes.identity.refreshToken, { refreshToken });

            if (result.status === 200) {
                const tokens = result.data as RefreshTokenResponseDto;

                if (tokens.token && tokens.refreshToken) {
                    setTokensInStorage(tokens.token, tokens.refreshToken);
                    return instance(originalRequest);
                }
            } else {
                resetTokensInStorage();
            }
        }

        return Promise.reject(error);
    },
];

export const handleCancelErrorInterceptor = (error: AxiosError<ApiException>) => {
    if (axios.isCancel(error)) {
        return Promise.reject(undefined);
    }

    return Promise.reject(error);
};
