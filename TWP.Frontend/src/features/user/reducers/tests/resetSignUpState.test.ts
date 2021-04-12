import { resetSignUpState } from "features/user/actions";
import { createApiError } from "tests/utils";
import user from "..";
import { createState } from "./helpers";

describe("user", () => {
    describe("reducers", () => {
        describe("resetSignUpState", () => {
            it("Should reset state variables associated with sign up.", () => {
                // given
                const action = resetSignUpState();

                // when
                const state = user(
                    createState({
                        signUpLoading: true,
                        signUpSuccess: true,
                        signUpError: createApiError(),
                        checkEmailAvailabilityLoading: true,
                        checkUsernameAvailabilityLoading: true,
                        isEmailAvailable: true,
                        isUsernameAvailable: true,
                        checkEmailAvailabilityLoadingError: createApiError(),
                        checkUsernameAvailabilityLoadingError: createApiError(),
                    }),
                    action
                );

                // then
                expect(state.signUpLoading).toBe(false);
                expect(state.signUpSuccess).toBeUndefined();
                expect(state.signUpError).toBeUndefined();
                expect(state.checkEmailAvailabilityLoading).toBe(false);
                expect(state.checkUsernameAvailabilityLoading).toBe(false);
                expect(state.isEmailAvailable).toBeUndefined();
                expect(state.isUsernameAvailable).toBeUndefined();
                expect(state.checkEmailAvailabilityLoadingError).toBeUndefined();
                expect(state.checkUsernameAvailabilityLoadingError).toBeUndefined();
            });
        });
    });
});
