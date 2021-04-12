import { resetSignOutState } from "features/user/actions";
import { createApiError } from "tests/utils";
import user from "..";
import { createState } from "./helpers";

describe("user", () => {
    describe("reducers", () => {
        describe("resetSignOutState", () => {
            it("Should reset state variables associated with sign out.", () => {
                // given
                const action = resetSignOutState();

                // when
                const state = user(
                    createState({ signOutLoading: true, signOutFinished: true, signOutError: createApiError() }),
                    action
                );

                // then
                expect(state.signOutLoading).toBe(false);
                expect(state.signOutFinished).toBeUndefined();
                expect(state.signOutError).toBeUndefined();
            });
        });
    });
});
