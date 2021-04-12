import { verifyToken } from "features/user/actions";
import { VerifyTokenResponseDto } from "features/user/dtos";
import { createApiError } from "tests/utils";
import user from "..";
import { createState, createTestUser } from "./helpers";

describe("user", () => {
    describe("reducers", () => {
        describe("verifyToken", () => {
            it("Should set loading flag, reset user and reset error on request action.", () => {
                // given
                const action = verifyToken.request();

                // when
                const state = user(createState({ user: createTestUser(), verifyTokenError: createApiError() }), action);

                // then
                expect(state.verifyTokenLoading).toBe(true);
                expect(state.user).toBeUndefined();
                expect(state.verifyTokenError).toBeUndefined();
            });

            it("Should reset loading flag, set user and reset error on success action.", () => {
                // given
                const responseDto: VerifyTokenResponseDto = { username: "username" };
                const action = verifyToken.success(responseDto);

                // when
                const state = user(
                    createState({
                        verifyTokenLoading: true,
                        verifyTokenError: createApiError(),
                    }),
                    action
                );

                // then
                expect(state.verifyTokenLoading).toBe(false);
                expect(state.user).toEqual({ username: responseDto.username });
                expect(state.verifyTokenError).toBeUndefined();
            });

            it("Should reset loading flag, reset user and set error on failure action.", () => {
                // given
                const error = createApiError();
                const action = verifyToken.failure(error);

                // when
                const state = user(createState({ verifyTokenLoading: true, user: createTestUser() }), action);

                // then
                expect(state.verifyTokenLoading).toBe(false);
                expect(state.user).toBeUndefined();
                expect(state.verifyTokenError).toBe(error);
            });
        });
    });
});
