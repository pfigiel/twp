import { verifyToken } from "features/user/actions";
import { VerifyTokenResponseDto } from "features/user/dtos";
import { resetTokensInStorage } from "features/user/utils";
import { RootState } from "store";
import { createApiError, createCancelToken } from "tests/utils";
import { mocked } from "ts-jest/utils";
import { verifyTokenAsync } from "..";

jest.mock("features/user/utils", () => ({
    ...(jest.requireActual("features/user/utils") as object),
    resetTokensInStorage: jest.fn(),
}));

describe("user", () => {
    describe("thunks", () => {
        describe("verifyTokenAsync", () => {
            it("Should dispatch request and success actions when api succeeds.", async () => {
                // given
                const responseDto: VerifyTokenResponseDto = { username: "username" };
                const dispatch = jest.fn();
                const api = {
                    verifyTokenAsync: jest.fn().mockReturnValue(responseDto),
                };
                const thunk = verifyTokenAsync(createCancelToken());

                // when
                await thunk(dispatch, () => ({} as RootState), api);

                // then
                expect(dispatch).toHaveBeenNthCalledWith(1, verifyToken.request());
                expect(dispatch).toHaveBeenNthCalledWith(2, verifyToken.success(responseDto));
            });

            it("Should dispatch request and failure actions and reset tokens in storage when api fails.", async () => {
                // given
                const resetTokensInStorageMock = jest.fn();
                const error = createApiError();
                const dispatch = jest.fn();
                const api = {
                    verifyTokenAsync: jest.fn().mockImplementation(() => {
                        throw error;
                    }),
                };
                const thunk = verifyTokenAsync(createCancelToken());
                mocked(resetTokensInStorage).mockImplementation(resetTokensInStorageMock);

                // when
                await thunk(dispatch, () => ({} as RootState), api);

                // then
                expect(dispatch).toHaveBeenNthCalledWith(1, verifyToken.request());
                expect(dispatch).toHaveBeenNthCalledWith(2, verifyToken.failure(error));
                expect(resetTokensInStorageMock).toHaveBeenCalled();
            });
        });
    });
});
