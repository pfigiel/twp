import baseApi from "api";
import { CancelToken } from "axios";
import config from "config";
import {
    SignInRequestDto,
    SignInResponseDto,
    RefreshTokenRequestDto,
    SignOutRequestDto,
    SignUpRequestDto,
    VerifyTokenResponseDto,
    CheckEmailAvailabilityResponseDto,
    CheckUsernameAvailabilityResponseDto,
} from "features/user/dtos";

export interface UserApi {
    checkEmailAvailabilityAsync: (
        queryParams: string,
        cancelToken: CancelToken
    ) => Promise<CheckEmailAvailabilityResponseDto>;
    checkUsernameAvailabilityAsync: (
        queryParams: string,
        cancelToken: CancelToken
    ) => Promise<CheckUsernameAvailabilityResponseDto>;
    signInAsync: (dto: SignInRequestDto, cancelToken: CancelToken) => Promise<SignInResponseDto>;
    signUpAsync: (dto: SignUpRequestDto, cancelToken: CancelToken) => Promise<void>;
    signOutAsync: (dto: SignOutRequestDto, cancelToken: CancelToken) => Promise<void>;
    verifyToken: (cancelToken: CancelToken) => Promise<VerifyTokenResponseDto>;
    refreshTokenAsync: (dto: RefreshTokenRequestDto, cancelToken: CancelToken) => Promise<void>;
}

const userApi: UserApi = {
    checkEmailAvailabilityAsync: async (queryParams: string, cancelToken: CancelToken) =>
        await baseApi.get<CheckEmailAvailabilityResponseDto>(
            `${config.apiRoutes.identity.checkEmailAvailability}${queryParams}`,
            cancelToken
        ),
    checkUsernameAvailabilityAsync: async (queryParams: string, cancelToken: CancelToken) =>
        await baseApi.get<CheckUsernameAvailabilityResponseDto>(
            `${config.apiRoutes.identity.checkUsernameAvailability}${queryParams}`,
            cancelToken
        ),
    signInAsync: async (dto: SignInRequestDto, cancelToken: CancelToken) =>
        await baseApi.post<SignInRequestDto, SignInResponseDto>(config.apiRoutes.identity.signIn, dto, cancelToken),
    signUpAsync: async (dto: SignUpRequestDto, cancelToken: CancelToken) =>
        await baseApi.post<SignUpRequestDto, void>(config.apiRoutes.identity.signUp, dto, cancelToken),
    signOutAsync: async (dto: SignOutRequestDto, cancelToken: CancelToken) =>
        await baseApi.post<SignOutRequestDto, void>(config.apiRoutes.identity.revokeRefreshToken, dto, cancelToken),
    verifyToken: async (cancelToken: CancelToken) =>
        await baseApi.get<VerifyTokenResponseDto>(config.apiRoutes.identity.verifyToken, cancelToken),
    refreshTokenAsync: async (dto: RefreshTokenRequestDto, cancelToken: CancelToken) =>
        await baseApi.post<RefreshTokenRequestDto, void>(config.apiRoutes.identity.refreshToken, dto, cancelToken),
};

export default userApi;
