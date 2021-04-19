import { apiRoutes } from "api/constants";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
    getAccessTokenFromStorage,
    getRefreshTokenFromStorage,
    resetTokensInStorage,
    setTokensInStorage,
} from "features/user/utils";
import { mocked } from "ts-jest/utils";
import { appendAuthHeaderInterceptor, handleCancelErrorInterceptor, refreshTokenInterceptor } from "..";

jest.mock("features/user/utils", () => ({
    ...(jest.requireActual("features/user/utils") as any),
    getAccessTokenFromStorage: jest.fn(),
    getRefreshTokenFromStorage: jest.fn(),
    setTokensInStorage: jest.fn(),
    resetTokensInStorage: jest.fn(),
}));

describe("api", () => {
    describe("interceptors", () => {
        const createAxiosError = (config?: { originalRequestUrl?: string; retried?: boolean }) =>
            (({
                config: {
                    retried: config?.retried,
                    url: config?.originalRequestUrl,
                },
            } as unknown) as AxiosError);

        describe("appendAuthHeaderInterceptor", () => {
            it("Should append auth header to the request if access token is present in local storage.", () => {
                // given
                const token = "token";
                const requestConfig: AxiosRequestConfig = {};
                mocked(getAccessTokenFromStorage).mockReturnValue(token);

                // when
                const result = appendAuthHeaderInterceptor(requestConfig);

                // then
                expect(result.headers.authorization).toBe(`Bearer ${token}`);
            });

            it("Should return original request if access token is missing in local storage.", () => {
                // given
                const requestConfig: AxiosRequestConfig = {};
                mocked(getAccessTokenFromStorage).mockReturnValue(null);

                // when
                const result = appendAuthHeaderInterceptor(requestConfig);

                // then
                expect(result).toBe(requestConfig);
            });
        });

        describe("refreshTokenInterceptor", () => {
            const createAxiosInstance = (post?: jest.Mock<any, any>) => (({ post } as unknown) as AxiosInstance);

            it("Should onFulfilled callback return original response.", async () => {
                // given
                const response: AxiosResponse = ({} as unknown) as AxiosResponse;
                const onFulfilled = refreshTokenInterceptor(createAxiosInstance())[0]!;

                // then
                const result = onFulfilled(response);

                // then
                expect(result).toBe(response);
            });

            it("Should re-throw undefined error if error is not defined.", async () => {
                // given
                const handler = refreshTokenInterceptor(createAxiosInstance())[1]!;

                // when
                await handler(undefined).catch((error?: AxiosError) => {
                    // then
                    expect(error).toBeUndefined();
                });
            });

            it("Should reset tokens in storage when intercepting a request originating from refreshToken route.", async () => {
                // given
                const resetTokensInStorageMock = jest.fn();
                mocked(resetTokensInStorage).mockImplementation(resetTokensInStorageMock);
                const handler = refreshTokenInterceptor(createAxiosInstance())[1]!;

                // when
                await handler(createAxiosError({ originalRequestUrl: apiRoutes.identity.refreshToken })).catch(() => {
                    // then
                    expect(resetTokensInStorageMock).toHaveBeenCalled();
                });
            });

            it("Should re-throw error when refresh token fetched from storage is null.", async () => {
                // given
                const axiosError = createAxiosError();
                mocked(getRefreshTokenFromStorage).mockReturnValue(null);
                const handler = refreshTokenInterceptor(createAxiosInstance())[1]!;

                // when
                await handler(axiosError).catch((error: AxiosError) => {
                    // then
                    expect(error).toBe(axiosError);
                });
            });

            it("Should re-throw error when error is marked as retried.", async () => {
                // given
                const axiosError = createAxiosError({ retried: true });
                mocked(getRefreshTokenFromStorage).mockReturnValue("refresh-token");
                const handler = refreshTokenInterceptor(createAxiosInstance())[1]!;

                // when
                await handler(axiosError).catch((error: AxiosError) => {
                    // then
                    expect(error).toBe(axiosError);
                });
            });

            it("Should call refresh token endpoint.", async () => {
                // given
                const refreshToken = "refresh-token";
                const axiosError = createAxiosError();
                const post = jest.fn().mockReturnValue({ status: 401 });
                mocked(getRefreshTokenFromStorage).mockReturnValue(refreshToken);
                const handler = refreshTokenInterceptor(createAxiosInstance(post))[1]!;

                // when
                await handler(axiosError).catch((error: AxiosError) => {
                    // then
                    expect(error).toBe(axiosError);
                    expect(post).toHaveBeenCalledWith(apiRoutes.identity.refreshToken, { refreshToken });
                });
            });

            it("Should re-throw error and reset tokens in storage if refresh request fails.", async () => {
                // given
                const token = undefined;
                const refreshToken = undefined;
                const axiosError = createAxiosError();
                const resetTokensInStorageMock = jest.fn();
                const post = jest.fn().mockReturnValue({ status: 401, data: { token, refreshToken } });
                mocked(getRefreshTokenFromStorage).mockReturnValue("refresh-token");
                mocked(resetTokensInStorage).mockImplementation(resetTokensInStorageMock);
                const axiosInstance = createAxiosInstance(post);
                const axiosInstanceWithCallSignature = Object.assign(() => {}, axiosInstance);
                const handler = refreshTokenInterceptor(axiosInstanceWithCallSignature)[1]!;

                // when
                await handler(axiosError).catch((error: AxiosError) => {
                    // then
                    expect(error).toBe(axiosError);
                    expect(resetTokensInStorageMock).toHaveBeenCalled();
                });
            });

            it("Should set new tokens in storage if refresh request succeeds and returns tokens.", async () => {
                // given
                const token = "token";
                const refreshToken = "refresh-token";
                const oldRefreshToken = "old-refresh-token";
                const setTokensInStorageMock = jest.fn();
                const post = jest.fn().mockReturnValue({ status: 200, data: { token, refreshToken } });
                const axiosInstance = createAxiosInstance(post);
                const axiosInstanceWithCallSignature = Object.assign(() => {}, axiosInstance);
                mocked(getRefreshTokenFromStorage).mockReturnValue(oldRefreshToken);
                mocked(setTokensInStorage).mockImplementation(setTokensInStorageMock);
                const handler = refreshTokenInterceptor(axiosInstanceWithCallSignature)[1]!;

                // when
                await handler(createAxiosError());

                // then
                expect(setTokensInStorage).toHaveBeenCalledWith(token, refreshToken);
            });
        });

        describe("handleCancelErrorInterceptor", () => {
            it("Should re-throw error when it is not a cancel error.", async () => {
                // given
                const axiosError = createAxiosError();

                // when & then
                await handleCancelErrorInterceptor(axiosError).catch((error) => expect(error).toBe(axiosError));
            });

            it("Should re-throw undefined error when it is not a cancel error.", async () => {
                // given
                jest.spyOn(axios, "isCancel").mockReturnValue(true);
                const axiosError = createAxiosError();

                // when & then
                await handleCancelErrorInterceptor(axiosError).catch((error) => expect(error).toBe(undefined));
            });
        });
    });
});
