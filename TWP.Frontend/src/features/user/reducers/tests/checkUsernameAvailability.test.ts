import { checkUsernameAvailability } from "features/user/actions";
import { createApiError } from "tests/utils";
import userReducer from "..";
import { createState } from "./helpers";

describe("user", () => {
    describe("reducers", () => {
        describe("checkUsernameAvailability", () => {
            it("Should set loading flag, reset isUsernameAvailable and reset error on request action.", () => {
                // given
                const action = checkUsernameAvailability.request();

                // when
                const state = userReducer(
                    createState({ isUsernameAvailable: true, checkUsernameAvailabilityLoadingError: createApiError() }),
                    action
                );

                // then
                expect(state.checkUsernameAvailabilityLoading).toBe(true);
                expect(state.isUsernameAvailable).toBeUndefined();
                expect(state.checkUsernameAvailabilityLoadingError).toBeUndefined();
            });

            it("Should reset loading flag, set isUsernameAvailable and reset error on success action.", () => {
                // given
                const isUsernameAvailable = true;
                const action = checkUsernameAvailability.success({ isUsernameAvailable });

                // when
                const state = userReducer(
                    createState({
                        checkUsernameAvailabilityLoading: true,
                        checkUsernameAvailabilityLoadingError: createApiError(),
                    }),
                    action
                );

                // then
                expect(state.checkUsernameAvailabilityLoading).toBe(false);
                expect(state.isUsernameAvailable).toBe(isUsernameAvailable);
                expect(state.checkUsernameAvailabilityLoadingError).toBeUndefined();
            });

            it("Should reset loading flag, reset isUsernameAvailable and set error on failure action.", () => {
                // given
                const error = createApiError();
                const action = checkUsernameAvailability.failure(error);

                // when
                const state = userReducer(
                    createState({ checkUsernameAvailabilityLoading: true, isUsernameAvailable: true }),
                    action
                );

                // then
                expect(state.checkUsernameAvailabilityLoading).toBe(false);
                expect(state.isUsernameAvailable).toBeUndefined();
                expect(state.checkUsernameAvailabilityLoadingError).toBe(error);
            });
        });
    });
});
