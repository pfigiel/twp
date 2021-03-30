import { ApiError } from "api/types";
import {
    CheckEmailAvailabilityResponseDto,
    CheckUsernameAvailabilityResponseDto,
    SignInResponseDto,
    VerifyTokenResponseDto,
} from "features/user/dtos";
import { ActionType, createAction, createAsyncAction } from "typesafe-actions";

export const signIn = createAsyncAction("SIGN_IN_REQUEST", "SIGN_IN_SUCCESS", "SIGN_IN_FAILURE")<
    void,
    SignInResponseDto,
    ApiError
>();

export const signUp = createAsyncAction("SIGN_UP_REQUEST", "SIGN_UP_SUCCESS", "SIGN_UP_FAILURE")<
    void,
    void,
    ApiError
>();

export const signOut = createAsyncAction("SIGN_OUT_REQUEST", "SIGN_OUT_SUCCESS", "SIGN_OUT_FAILURE")<
    void,
    void,
    ApiError
>();

export const verifyToken = createAsyncAction("VERIFY_TOKEN_REQUEST", "VERIFY_TOKEN_SUCCESS", "VERIFY_TOKEN_FAILURE")<
    void,
    VerifyTokenResponseDto,
    ApiError
>();

export const checkEmailAvailability = createAsyncAction(
    "CHECK_EMAIL_AVAILABILITY_REQUEST",
    "CHECK_EMAIL_AVAILABILITY_SUCCESS",
    "CHECK_EMAIL_AVAILABILITY_FAILURE"
)<void, CheckEmailAvailabilityResponseDto, ApiError>();

export const checkUsernameAvailability = createAsyncAction(
    "CHECK_USERNAME_AVAILABILITY_REQUEST",
    "CHECK_USERNAME_AVAILABILITY_SUCCESS",
    "CHECK_USERNAME_AVAILABILITY_FAILURE"
)<void, CheckUsernameAvailabilityResponseDto, ApiError>();

export const resetUser = createAction("RESET_USER")<void>();

export const resetSignInState = createAction("RESET_SIGN_IN_STATE")<void>();

export const resetSignUpState = createAction("RESET_SIGN_UP_STATE")<void>();

export const resetSignOutState = createAction("CREATE_SIGN_OUT_STATE")<void>();

type UserAction =
    | ActionType<typeof signIn>
    | ActionType<typeof signUp>
    | ActionType<typeof signOut>
    | ActionType<typeof verifyToken>
    | ActionType<typeof checkEmailAvailability>
    | ActionType<typeof checkUsernameAvailability>
    | ActionType<typeof resetUser>
    | ActionType<typeof resetSignInState>
    | ActionType<typeof resetSignUpState>
    | ActionType<typeof resetSignOutState>;

export default UserAction;
