import { ApiError } from "api/types";
import UserAction, {
    signIn,
    resetSignInState,
    resetSignOutState,
    resetUser,
    signOut,
    verifyToken,
    signUp,
    checkEmailAvailability,
    checkUsernameAvailability,
    resetSignUpState,
} from "features/user/actions";
import { User } from "features/user/types";
import produce from "immer";
import { getType } from "typesafe-actions";

export interface UserState {
    signInLoading: boolean;
    signInSuccess?: boolean;
    signInError?: ApiError;
    signUpLoading: boolean;
    signUpSuccess?: boolean;
    signUpError?: ApiError;
    signOutLoading: boolean;
    signOutFinished?: boolean;
    signOutError?: ApiError;
    verifyTokenLoading: boolean;
    verifyTokenError?: ApiError;
    checkEmailAvailabilityLoading: boolean;
    isEmailAvailable?: boolean;
    checkEmailAvailabilityLoadingError?: ApiError;
    checkUsernameAvailabilityLoading: boolean;
    isUsernameAvailable?: boolean;
    checkUsernameAvailabilityLoadingError?: ApiError;
    user?: User;
}

const user = (
    state: UserState = {
        signInLoading: false,
        signUpLoading: false,
        signOutLoading: false,
        verifyTokenLoading: false,
        checkEmailAvailabilityLoading: false,
        checkUsernameAvailabilityLoading: false,
    },
    action: UserAction
): UserState =>
    produce(state, (draft) => {
        switch (action.type) {
            case getType(signIn.request):
                draft.signInLoading = true;
                draft.signInSuccess = undefined;
                draft.signInError = undefined;
                break;
            case getType(signIn.success):
                draft.signInLoading = false;
                draft.signInSuccess = true;
                draft.signInError = undefined;
                draft.user = { username: action.payload.username };
                break;
            case getType(signIn.failure):
                draft.signInLoading = false;
                draft.signInSuccess = false;
                draft.signInError = action.payload;
                break;
            case getType(signUp.request):
                draft.signUpLoading = true;
                draft.signUpSuccess = undefined;
                draft.signUpError = undefined;
                break;
            case getType(signUp.success):
                draft.signUpLoading = false;
                draft.signUpSuccess = true;
                draft.signUpError = undefined;
                break;
            case getType(signUp.failure):
                draft.signUpLoading = false;
                draft.signUpSuccess = false;
                draft.signUpError = action.payload;
                break;
            case getType(signOut.request):
                draft.signOutLoading = true;
                draft.signOutFinished = undefined;
                draft.signOutError = undefined;
                break;
            case getType(signOut.success):
                draft.signOutLoading = false;
                draft.signOutFinished = true;
                draft.signOutError = undefined;
                break;
            case getType(signOut.failure):
                draft.signOutLoading = false;
                draft.signOutFinished = true;
                draft.signOutError = action.payload;
                break;
            case getType(verifyToken.request):
                draft.verifyTokenLoading = true;
                draft.user = undefined;
                draft.verifyTokenError = undefined;
                break;
            case getType(verifyToken.success):
                draft.verifyTokenLoading = false;
                draft.user = { username: action.payload.username };
                draft.verifyTokenError = undefined;
                break;
            case getType(verifyToken.failure):
                draft.verifyTokenLoading = false;
                draft.user = undefined;
                draft.verifyTokenError = action.payload;
                break;
            case getType(checkEmailAvailability.request):
                draft.checkEmailAvailabilityLoading = true;
                draft.isEmailAvailable = undefined;
                draft.checkEmailAvailabilityLoadingError = undefined;
                break;
            case getType(checkEmailAvailability.success):
                draft.checkEmailAvailabilityLoading = false;
                draft.isEmailAvailable = action.payload.isEmailAvailable;
                draft.checkEmailAvailabilityLoadingError = undefined;
                break;
            case getType(checkEmailAvailability.failure):
                draft.checkEmailAvailabilityLoading = false;
                draft.isEmailAvailable = undefined;
                draft.checkEmailAvailabilityLoadingError = action.payload;
                break;
            case getType(checkUsernameAvailability.request):
                draft.checkUsernameAvailabilityLoading = true;
                draft.isUsernameAvailable = undefined;
                draft.checkUsernameAvailabilityLoadingError = undefined;
                break;
            case getType(checkUsernameAvailability.success):
                draft.checkUsernameAvailabilityLoading = false;
                draft.isUsernameAvailable = action.payload.isUsernameAvailable;
                draft.checkUsernameAvailabilityLoadingError = undefined;
                break;
            case getType(checkUsernameAvailability.failure):
                draft.checkUsernameAvailabilityLoading = false;
                draft.isUsernameAvailable = undefined;
                draft.checkUsernameAvailabilityLoadingError = action.payload;
                break;
            case getType(resetUser):
                draft.user = undefined;
                break;
            case getType(resetSignInState):
                draft.signInLoading = false;
                draft.signInSuccess = undefined;
                draft.signInError = undefined;
                break;
            case getType(resetSignUpState):
                draft.signUpLoading = false;
                draft.signUpSuccess = undefined;
                draft.signUpError = undefined;
                draft.checkEmailAvailabilityLoading = false;
                draft.checkUsernameAvailabilityLoading = false;
                draft.isEmailAvailable = undefined;
                draft.isUsernameAvailable = undefined;
                draft.checkEmailAvailabilityLoadingError = undefined;
                draft.checkUsernameAvailabilityLoadingError = undefined;
                break;
            case getType(resetSignOutState):
                draft.signOutLoading = false;
                draft.signOutFinished = undefined;
                draft.signOutError = undefined;
                break;
        }
    });

export default user;
