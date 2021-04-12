import { User } from "features/user/types";
import { UserState } from "..";

export const createState = (state: Partial<UserState>): UserState => ({
    ...state,
    signInLoading: state.signInLoading ?? false,
    signUpLoading: state.signUpLoading ?? false,
    signOutLoading: state.signOutLoading ?? false,
    verifyTokenLoading: state.verifyTokenLoading ?? false,
    checkEmailAvailabilityLoading: state.checkEmailAvailabilityLoading ?? false,
    checkUsernameAvailabilityLoading: state.checkUsernameAvailabilityLoading ?? false,
});

export const createTestUser = (): User => ({
    username: "Username",
});
