import { checkEmailAvailability } from "features/user/actions";
import { createApiError } from "tests/utils";
import userReducer from "..";
import { createState } from "./helpers";

describe("user", () => {
    describe("reducers", () => {
        describe("checkEmailAvailability", () => {
            it("Should set loading flag, reset isEmailAvailable and reset error on request action.", () => {
                // given
                const action = checkEmailAvailability.request();

                // when
                const state = userReducer(
                    createState({ isEmailAvailable: true, checkEmailAvailabilityLoadingError: createApiError() }),
                    action
                );

                // then
                expect(state.checkEmailAvailabilityLoading).toBe(true);
                expect(state.isEmailAvailable).toBeUndefined();
                expect(state.checkEmailAvailabilityLoadingError).toBeUndefined();
            });

            it("Should reset loading flag, set isEmailAvailable and reset error on success action.", () => {
                // given
                const isEmailAvailable = true;
                const action = checkEmailAvailability.success({ isEmailAvailable });

                // when
                const state = userReducer(
                    createState({
                        checkEmailAvailabilityLoading: true,
                        checkEmailAvailabilityLoadingError: createApiError(),
                    }),
                    action
                );

                // then
                expect(state.checkEmailAvailabilityLoading).toBe(false);
                expect(state.isEmailAvailable).toBe(isEmailAvailable);
                expect(state.checkEmailAvailabilityLoadingError).toBeUndefined();
            });

            it("Should reset loading flag, reset isEmailAvailable and set error on failure action.", () => {
                // given
                const error = createApiError();
                const action = checkEmailAvailability.failure(error);

                // when
                const state = userReducer(
                    createState({ checkEmailAvailabilityLoading: true, isEmailAvailable: true }),
                    action
                );

                // then
                expect(state.checkEmailAvailabilityLoading).toBe(false);
                expect(state.isEmailAvailable).toBeUndefined();
                expect(state.checkEmailAvailabilityLoadingError).toBe(error);
            });
        });
    });
});
