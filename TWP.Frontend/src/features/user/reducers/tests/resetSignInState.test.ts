import { resetSignInState } from "features/user/actions";
import { createApiError } from "tests/utils";
import userReducer from "..";
import { createState } from "./helpers";

describe("user", () => {
    describe("reducers", () => {
        describe("resetSignInState", () => {
            it("Should reset state variables associated with sign up.", () => {
                // given
                const action = resetSignInState();

                // when
                const state = userReducer(
                    createState({
                        signInLoading: true,
                        signInSuccess: true,
                        signInError: createApiError(),
                    }),
                    action
                );

                // then
                expect(state.signInLoading).toBe(false);
                expect(state.signInSuccess).toBeUndefined();
                expect(state.signInError).toBeUndefined();
            });
        });
    });
});
