import { resetUser, signOut } from "features/user/actions";
import { getRefreshTokenFromStorage, resetTokensInStorage } from "features/user/utils";
import { RootState } from "store";
import { createApiError, createCancelToken } from "tests/utils";
import { mocked } from "ts-jest/utils";
import { signOutAsync } from "..";

jest.mock("features/user/utils", () => ({
    ...(jest.requireActual("features/user/utils") as object),
    getRefreshTokenFromStorage: jest.fn(),
    resetTokensInStorage: jest.fn(),
}));

describe("user", () => {
    describe("thunks", () => {
        describe("signOutAsync", () => {
            it("Should dispatch request, not call api, dispatch success action, dispatch resetUser action and reset tokens in storage when there is no refresh token in storage.", async () => {
                // given
                const dispatch = jest.fn();
                const apiMethod = jest.fn();
                const resetTokensInStorageMock = jest.fn();
                const thunk = signOutAsync(createCancelToken());
                const api = {
                    signOutAsync: apiMethod,
                };
                mocked(getRefreshTokenFromStorage).mockReturnValue(null);
                mocked(resetTokensInStorage).mockImplementation(resetTokensInStorageMock);

                // when
                await thunk(dispatch, () => ({} as RootState), api);

                // then
                expect(dispatch).toHaveBeenNthCalledWith(1, signOut.request());
                expect(dispatch).toHaveBeenNthCalledWith(2, signOut.success());
                expect(dispatch).toHaveBeenNthCalledWith(3, resetUser());
                expect(resetTokensInStorageMock).toHaveBeenCalled();
                expect(apiMethod).not.toHaveBeenCalled();
            });

            it("Should dispatch request, call api, dispatch success actions, dispatch resetUser action and reset tokens in storage when there is a refresh token in storage and api succeeds.", async () => {
                // given
                const dispatch = jest.fn();
                const apiMethod = jest.fn();
                const resetTokensInStorageMock = jest.fn();
                const api = {
                    signOutAsync: apiMethod,
                };
                const thunk = signOutAsync(createCancelToken());
                mocked(getRefreshTokenFromStorage).mockReturnValue("refresh-token");
                mocked(resetTokensInStorage).mockImplementation(resetTokensInStorageMock);

                // when
                await thunk(dispatch, () => ({} as RootState), api);

                // then
                expect(dispatch).toHaveBeenNthCalledWith(1, signOut.request());
                expect(dispatch).toHaveBeenNthCalledWith(2, signOut.success());
                expect(dispatch).toHaveBeenNthCalledWith(3, resetUser());
                expect(resetTokensInStorageMock).toHaveBeenCalled();
                expect(apiMethod).toHaveBeenCalled();
            });

            it("Should dispatch request and failure actions, dispatch resetUser action and reset tokens in storage when there is a refresh token in storage and api fails.", async () => {
                // given
                const error = createApiError();
                const dispatch = jest.fn();
                const resetTokensInStorageMock = jest.fn();
                const api = {
                    signOutAsync: jest.fn().mockImplementation(() => {
                        throw error;
                    }),
                };
                const thunk = signOutAsync(createCancelToken());
                mocked(getRefreshTokenFromStorage).mockReturnValue("refresh-token");
                mocked(resetTokensInStorage).mockImplementation(resetTokensInStorageMock);

                // when
                await thunk(dispatch, () => ({} as RootState), api);

                // then
                expect(dispatch).toHaveBeenNthCalledWith(1, signOut.request());
                expect(dispatch).toHaveBeenNthCalledWith(2, signOut.failure(error));
                expect(dispatch).toHaveBeenNthCalledWith(3, resetUser());
                expect(resetTokensInStorageMock).toHaveBeenCalled();
            });
        });
    });
});
