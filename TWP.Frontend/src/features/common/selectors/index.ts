import { createSelector } from "reselect";
import { RootState } from "store";

const selectState = (state: RootState) => state.common;

export const selectLocale = createSelector(selectState, (state) => state.locale);
