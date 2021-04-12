import { signIn } from "features/user/actions";
import { SignInResponseDto } from "features/user/dtos";
import { setTokensInStorage } from "features/user/utils";
import { RootState } from "store";
import { createApiError, createCancelToken } from "tests/utils";
import { mocked } from "ts-jest/utils";
import { signInAsync } from "..";

jest.mock("features/user/utils", () => ({
    ...(jest.requireActual("features/user/utils") as object),
    setTokensInStorage: jest.fn(),
}));

describe("user", () => {
    describe("thunks", () => {
        describe("signInAsync", () => {
            it("Should dispatch request and success actions as well as set tokens in storage when api succeeds.", async () => {
                // given
                const responseDto: SignInResponseDto = {
                    username: "username",
                    token: "token",
                    refreshToken: "refreshToken",
                };
                const dispatch = jest.fn();
                const setTokensInStorageMock = jest.fn();
                const api = {
                    signInAsync: jest.fn().mockReturnValue(responseDto),
                };
                const thunk = signInAsync("username-or-email", "password", createCancelToken());
                mocked(setTokensInStorage).mockImplementation(setTokensInStorageMock);

                // when
                await thunk(dispatch, () => ({} as RootState), api);

                // then
                expect(dispatch).toHaveBeenNthCalledWith(1, signIn.request());
                expect(dispatch).toHaveBeenNthCalledWith(2, signIn.success(responseDto));
                expect(setTokensInStorageMock).toHaveBeenCalledWith(responseDto.token, responseDto.refreshToken);
            });

            it("Should dispatch request and failure actions when api fails.", async () => {
                // given
                const error = createApiError();
                const dispatch = jest.fn();
                const api = {
                    signInAsync: jest.fn().mockImplementation(() => {
                        throw error;
                    }),
                };
                const thunk = signInAsync("username-or-email", "password", createCancelToken());

                // when
                await thunk(dispatch, () => ({} as RootState), api);

                // then
                expect(dispatch).toHaveBeenNthCalledWith(1, signIn.request());
                expect(dispatch).toHaveBeenNthCalledWith(2, signIn.failure(error));
            });
        });
    });
});
