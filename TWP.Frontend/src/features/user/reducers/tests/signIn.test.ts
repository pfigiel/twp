import { signIn } from "features/user/actions";
import { SignInResponseDto } from "features/user/dtos";
import { createApiError } from "tests/utils";
import user from "..";
import { createState } from "./helpers";

describe("user", () => {
    describe("reducers", () => {
        describe("signIn", () => {
            it("Should set loading flag, reset success flag and reset error on request action.", () => {
                // given
                const action = signIn.request();

                // when
                const state = user(createState({ signUpSuccess: true, signUpError: createApiError() }), action);

                // then
                expect(state.signInLoading).toBe(true);
                expect(state.signInSuccess).toBeUndefined();
                expect(state.signInError).toBeUndefined();
            });

            it("Should reset loading flag, set success flag, set user and reset error on success action.", () => {
                // given
                const responseDto: SignInResponseDto = {
                    username: "username",
                    token: "token",
                    refreshToken: "refreshToken",
                };
                const action = signIn.success(responseDto);

                // when
                const state = user(
                    createState({
                        signInLoading: true,
                        signInError: createApiError(),
                    }),
                    action
                );

                // then
                expect(state.signInLoading).toBe(false);
                expect(state.signInSuccess).toBe(true);
                expect(state.user).toEqual({ username: responseDto.username });
                expect(state.signInError).toBeUndefined();
            });

            it("Should reset loading flag, set success flag and set error on failure action.", () => {
                // given
                const error = createApiError();
                const action = signIn.failure(error);

                // when
                const state = user(createState({ signInLoading: true, signInSuccess: true }), action);

                // then
                expect(state.signInLoading).toBe(false);
                expect(state.signInSuccess).toBe(false);
                expect(state.signInError).toBe(error);
            });
        });
    });
});
