import { AppNotification } from "features/layout/types";
import produce from "immer";
import { getType } from "typesafe-actions";
import LayoutAction, { pushNotification, removeLastNotification, removeNotification, setLoaderState } from "../actions";

export interface LayoutState {
    notifications: AppNotification[];
    isLoaderVisible: boolean;
}

const layout = (
    state: LayoutState = { notifications: [], isLoaderVisible: false },
    action: LayoutAction
): LayoutState =>
    produce(state, (draft) => {
        switch (action.type) {
            case getType(setLoaderState):
                draft.isLoaderVisible = action.payload;
                break;
            case getType(pushNotification):
                draft.notifications = [action.payload, ...state.notifications];
                break;
            case getType(removeNotification):
                const newNotifications = [...state.notifications];
                newNotifications.splice(action.payload, 1);
                draft.notifications = newNotifications;
                break;
            case getType(removeLastNotification):
                if (state.notifications.length) {
                    draft.notifications = state.notifications.slice(0, state.notifications.length - 1);
                }
                break;
        }
    });

export default layout;
