export const apiRoutes = {
    base: "https://localhost:5001/api/",
    healthcheck: "healthcheck/",
    identity: {
        checkEmailAvailability: "identity/check-email-availability",
        checkUsernameAvailability: "identity/check-username-availability",
        refreshToken: "identity/refresh-token",
        revokeRefreshToken: "identity/revoke-refresh-token",
        signIn: "identity/sign-in",
        signUp: "identity/sign-up",
        verifyToken: "identity/verify-token",
    },
    songs: {
        getSongs: "songs",
    },
};
