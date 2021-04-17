import { resetUser } from "features/user/actions";
import userReducer from "..";
import { createState, createTestUser } from "./helpers";

describe("user", () => {
    describe("reducers", () => {
        describe("resetUser", () => {
            it("Should reset user.", () => {
                // given
                const action = resetUser();

                // when
                const state = userReducer(
                    createState({
                        user: createTestUser(),
                    }),
                    action
                );

                // then
                expect(state.user).toBeUndefined();
            });
        });
    });
});
