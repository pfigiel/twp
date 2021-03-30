export interface CheckEmailAvailabilityResponseDto {
    isEmailAvailable: boolean;
}

export interface CheckUsernameAvailabilityResponseDto {
    isUsernameAvailable: boolean;
}

export interface SignInRequestDto {
    usernameOrEmail: string;
    password: string;
}

export interface SignInResponseDto {
    username: string;
    token: string;
    refreshToken: string;
}

export interface RefreshTokenRequestDto {
    refreshToken: string;
}

export interface RefreshTokenResponseDto {
    token: string;
    refreshToken: string;
}

export interface SignOutRequestDto {
    refreshToken: string;
}

export interface VerifyTokenResponseDto {
    username: string;
}

export interface SignUpRequestDto {
    email: string;
    username: string;
    password: string;
}
