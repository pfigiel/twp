import { createSelector } from "reselect";
import { RootState } from "store";

const selectState = (state: RootState) => state.user;

export const selectSignInLoading = createSelector(selectState, (state) => state.signInLoading);
export const selectSignInSuccess = createSelector(selectState, (state) => state.signInSuccess);
export const selectSignInError = createSelector(selectState, (state) => state.signInError);

export const selectSignUpLoading = createSelector(selectState, (state) => state.signUpLoading);
export const selectSignUpSuccess = createSelector(selectState, (state) => state.signUpSuccess);
export const selectSignUpError = createSelector(selectState, (state) => state.signUpError);

export const selectSignOutLoading = createSelector(selectState, (state) => state.signOutLoading);
export const selectSignOutFinished = createSelector(selectState, (state) => state.signOutFinished);
export const selectSignOutError = createSelector(selectState, (state) => state.signOutError);

export const selectVerifyTokenLoading = createSelector(selectState, (state) => state.verifyTokenLoading);
export const selectVerifyTokenError = createSelector(selectState, (state) => state.verifyTokenError);

export const selectIsEmailAvailable = createSelector(selectState, (state) => state.isEmailAvailable);
export const selectIsUsernameAvailable = createSelector(selectState, (state) => state.isUsernameAvailable);

export const selectUser = createSelector(selectState, (state) => state.user);
