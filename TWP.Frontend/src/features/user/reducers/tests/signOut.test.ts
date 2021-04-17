import { signOut } from "features/user/actions";
import { createApiError } from "tests/utils";
import userReducer from "..";
import { createState } from "./helpers";

describe("user", () => {
    describe("reducers", () => {
        describe("signOut", () => {
            it("Should set loading flag, reset signOutFinished and reset error on request action.", () => {
                // given
                const action = signOut.request();

                // when
                const state = userReducer(
                    createState({ signOutFinished: true, signOutError: createApiError() }),
                    action
                );

                // then
                expect(state.signOutLoading).toBe(true);
                expect(state.signOutFinished).toBeUndefined();
                expect(state.signOutError).toBeUndefined();
            });

            it("Should reset loading flag, set signOutFinished to true and reset error on success action.", () => {
                // given
                const action = signOut.success();

                // when
                const state = userReducer(
                    createState({
                        signOutLoading: true,
                        signOutError: createApiError(),
                    }),
                    action
                );

                // then
                expect(state.signOutLoading).toBe(false);
                expect(state.signOutFinished).toBe(true);
                expect(state.signOutError).toBeUndefined();
            });

            it("Should reset loading flag, set signOutFinished to true and set error on failure action.", () => {
                // given
                const error = createApiError();
                const action = signOut.failure(error);

                // when
                const state = userReducer(createState({ signOutLoading: true, signOutFinished: true }), action);

                // then
                expect(state.signOutLoading).toBe(false);
                expect(state.signOutFinished).toBe(true);
                expect(state.signOutError).toBe(error);
            });
        });
    });
});
