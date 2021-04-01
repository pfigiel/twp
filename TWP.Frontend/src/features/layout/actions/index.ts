import { AppNotification } from "features/layout/types";
import { ActionType, createAction } from "typesafe-actions";

export const setLoaderState = createAction("TOGGLE_LOADER_STATE")<boolean>();

export const pushNotification = createAction("PUSH_NOTIFICATION")<AppNotification>();

export const removeNotification = createAction("REMOVE_NOTIFICATION")<number>();

export const removeLastNotification = createAction("REMOVE_LAST_NOTIFICATION")<void>();

type LayoutAction =
    | ActionType<typeof setLoaderState>
    | ActionType<typeof pushNotification>
    | ActionType<typeof removeNotification>
    | ActionType<typeof removeLastNotification>;

export default LayoutAction;
