import { signUp } from "features/user/actions";
import { createApiError } from "tests/utils";
import user from "..";
import { createState } from "./helpers";

describe("user", () => {
    describe("reducers", () => {
        describe("signUp", () => {
            it("Should set loading flag, reset success flag and reset error on request action.", () => {
                // given
                const action = signUp.request();

                // when
                const state = user(createState({ signUpSuccess: true, signUpError: createApiError() }), action);

                // then
                expect(state.signUpLoading).toBe(true);
                expect(state.signUpSuccess).toBeUndefined();
                expect(state.signUpError).toBeUndefined();
            });

            it("Should reset loading flag, set success flag and reset error on success action.", () => {
                // given
                const action = signUp.success();

                // when
                const state = user(
                    createState({
                        signUpLoading: true,
                        signUpError: createApiError(),
                    }),
                    action
                );

                // then
                expect(state.signUpLoading).toBe(false);
                expect(state.signUpSuccess).toBe(true);
                expect(state.signUpError).toBeUndefined();
            });

            it("Should reset loading flag, set success flag and set error on failure action.", () => {
                // given
                const error = createApiError();
                const action = signUp.failure(error);

                // when
                const state = user(createState({ signUpLoading: true, signUpSuccess: true }), action);

                // then
                expect(state.signUpLoading).toBe(false);
                expect(state.signUpSuccess).toBe(false);
                expect(state.signUpError).toBe(error);
            });
        });
    });
});
