import { createSelector } from "reselect";
import { RootState } from "store";

const selectState = (state: RootState) => state.layout;

export const selectNotifications = createSelector(selectState, (state) => state.notifications);

export const selectLoaderVisible = createSelector(selectState, (state) => state.isLoaderVisible);
