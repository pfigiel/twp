import { pushNotification, removeLastNotification, removeNotification, setLoaderState } from "features/layout/actions";
import { AppNotification } from "features/layout/types";
import each from "jest-each";
import layoutReducer, { LayoutState } from "..";

describe("layout", () => {
    describe("reducers", () => {
        const createState = (state: Partial<LayoutState> = {}): LayoutState => ({
            notifications: state.notifications ?? [],
            isLoaderVisible: state.isLoaderVisible ?? false,
        });

        describe("setLoaderState", () => {
            each([true, false]).it("Should set isLoaderVisible to %p.", (isLoaderVisible: boolean) => {
                // given
                const action = setLoaderState(isLoaderVisible);

                // when
                const state = layoutReducer(createState({ isLoaderVisible: !isLoaderVisible }), action);

                // then
                expect(state.isLoaderVisible).toBe(isLoaderVisible);
            });
        });

        describe("pushNotification", () => {
            it("Should push notification to the front of notifications array.", () => {
                // given
                const notification: AppNotification = { type: "success", message: "new-notification" };
                const notifications: AppNotification[] = [{ type: "error", message: "old-notification" }];
                const action = pushNotification(notification);

                // when
                const state = layoutReducer(createState({ notifications }), action);

                // then
                expect(state.notifications).toHaveLength(2);
                expect(state.notifications[0]).toBe(notification);
                expect(state.notifications[1]).toBe(notifications[0]);
            });
        });

        describe("removeNotification", () => {
            it("Should remove notification at given index from notifications array.", () => {
                // given
                const indexOfNotificationToRemove = 1;
                const notifications: AppNotification[] = [
                    { type: "error", message: "notification-one" },
                    { type: "error", message: "notification-two" },
                    { type: "error", message: "notification-three" },
                ];
                const action = removeNotification(indexOfNotificationToRemove);

                // when
                const state = layoutReducer(createState({ notifications }), action);

                // then
                expect(state.notifications).toHaveLength(notifications.length - 1);
                expect(state.notifications[0]).toBe(notifications[0]);
                expect(state.notifications[1]).toBe(notifications[2]);
            });
        });

        describe("removeLastNotification", () => {
            it("Should remove last notification from notifications array.", () => {
                // given
                const notifications: AppNotification[] = [
                    { type: "error", message: "notification-one" },
                    { type: "error", message: "notification-two" },
                    { type: "error", message: "notification-three" },
                ];
                const action = removeLastNotification();

                // when
                const state = layoutReducer(createState({ notifications }), action);

                // then
                expect(state.notifications).toHaveLength(notifications.length - 1);
                expect(state.notifications[0]).toBe(notifications[0]);
                expect(state.notifications[1]).toBe(notifications[1]);
            });

            it("Should not affect notifications array if it is empty.", () => {
                // given
                const notifications: AppNotification[] = [];
                const action = removeLastNotification();

                // when
                const state = layoutReducer(createState({ notifications }), action);

                // then
                expect(state.notifications).toBe(notifications);
            });
        });
    });
});
