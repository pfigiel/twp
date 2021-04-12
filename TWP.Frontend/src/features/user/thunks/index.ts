import { makeApiRequest } from "api/utils";
import { CancelToken } from "axios";
import { mapObjectToQueryParameters } from "features/common/utils";
import UserAction, {
    signIn,
    resetUser,
    signOut,
    verifyToken,
    signUp,
    checkEmailAvailability,
    checkUsernameAvailability,
} from "features/user/actions";
import { UserApi } from "features/user/api";
import { SignUpRequestDto } from "features/user/dtos";
import { getRefreshTokenFromStorage, resetTokensInStorage, setTokensInStorage } from "features/user/utils";
import { ThunkAction } from "redux-thunk";
import { RootState } from "store";

export const checkEmailAvailabilityAsync = (
    email: string,
    cancelToken: CancelToken
): ThunkAction<void, RootState, Pick<UserApi, "checkEmailAvailabilityAsync">, UserAction> => {
    return async (dispatch, _, api) => {
        dispatch(checkEmailAvailability.request());

        return await makeApiRequest(
            api.checkEmailAvailabilityAsync,
            [mapObjectToQueryParameters({ email }), cancelToken],
            checkEmailAvailability.success,
            checkEmailAvailability.failure,
            dispatch
        );
    };
};

export const checkUsernameAvailabilityAsync = (
    username: string,
    cancelToken: CancelToken
): ThunkAction<void, RootState, Pick<UserApi, "checkUsernameAvailabilityAsync">, UserAction> => {
    return async (dispatch, _, api) => {
        dispatch(checkUsernameAvailability.request());

        return await makeApiRequest(
            api.checkUsernameAvailabilityAsync,
            [mapObjectToQueryParameters({ username }), cancelToken],
            checkUsernameAvailability.success,
            checkUsernameAvailability.failure,
            dispatch
        );
    };
};

export const signInAsync = (
    usernameOrEmail: string,
    password: string,
    cancelToken: CancelToken
): ThunkAction<void, RootState, Pick<UserApi, "signInAsync">, UserAction> => {
    return async (dispatch, _, api) => {
        dispatch(signIn.request());

        try {
            const response = await api.signInAsync({ usernameOrEmail, password }, cancelToken);

            setTokensInStorage(response.token, response.refreshToken);
            dispatch(signIn.success(response));
        } catch (error) {
            dispatch(signIn.failure(error));
        }
    };
};

export const signUpAsync = (
    dto: SignUpRequestDto,
    cancelToken: CancelToken
): ThunkAction<void, RootState, Pick<UserApi, "signUpAsync">, UserAction> => {
    return async (dispatch, _, api) => {
        dispatch(signUp.request());

        return await makeApiRequest(api.signUpAsync, [dto, cancelToken], signUp.success, signUp.failure, dispatch);
    };
};

export const signOutAsync = (
    cancelToken: CancelToken
): ThunkAction<void, RootState, Pick<UserApi, "signOutAsync">, UserAction> => {
    return async (dispatch, _, api) => {
        dispatch(signOut.request());

        const refreshToken = getRefreshTokenFromStorage();

        try {
            if (refreshToken) {
                await api.signOutAsync({ refreshToken }, cancelToken);
            }
            dispatch(signOut.success());
        } catch (error) {
            dispatch(signOut.failure(error));
        } finally {
            dispatch(resetUser());
            resetTokensInStorage();
        }
    };
};

export const verifyTokenAsync = (
    cancelToken: CancelToken
): ThunkAction<void, RootState, Pick<UserApi, "verifyTokenAsync">, UserAction> => {
    return async (dispatch, _, api) => {
        dispatch(verifyToken.request());

        try {
            const response = await api.verifyTokenAsync(cancelToken);
            dispatch(verifyToken.success(response));
        } catch (error) {
            resetTokensInStorage();
            dispatch(verifyToken.failure(error));
        }
    };
};
