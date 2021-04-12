import { makeApiRequest } from "api/utils";
import { signUp } from "features/user/actions";
import { SignUpRequestDto } from "features/user/dtos";
import { RootState } from "store";
import { createCancelToken } from "tests/utils";
import { mocked } from "ts-jest/utils";
import { signUpAsync } from "..";

jest.mock("api/utils", () => ({ ...(jest.requireActual("api/utils") as object), makeApiRequest: jest.fn() }));

describe("user", () => {
    describe("thunks", () => {
        describe("signUpAsync", () => {
            it("Should dispatch request action and call makeApiRequest.", async () => {
                // given
                const requestDto: SignUpRequestDto = { email: "email", username: "username", password: "password" };
                const cancelToken = createCancelToken();
                const dispatch = jest.fn();
                const makeApiRequestMock = jest.fn();
                const thunk = signUpAsync(requestDto, cancelToken);
                const api = {
                    signUpAsync: jest.fn(),
                };
                mocked(makeApiRequest).mockImplementation(makeApiRequestMock);

                // when
                await thunk(dispatch, () => ({} as RootState), api);

                // then
                expect(dispatch).toHaveBeenNthCalledWith(1, signUp.request());
                expect(makeApiRequestMock).toHaveBeenCalledWith(
                    api.signUpAsync,
                    [requestDto, cancelToken],
                    signUp.success,
                    signUp.failure,
                    dispatch
                );
            });
        });
    });
});
