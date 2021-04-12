const config = {
    apiRoutes: {
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
    },
    appRoutes: {
        dashboard: "/dashboard",
        landingPage: "/",
        collections: "/collections",
        editor: "/editor",
        privacyPolicy: "/privacy-policy",
        regulations: "/regulations",
        signIn: "/sign-in",
        signOut: "/sign-out",
        signUp: "/sign-up",
        songs: "/songs",
        songCreator: "/song-creator",
    },
    deviceBreakpoints: {
        smartphone: 641,
        tablet: 1025,
    },
};

export default config;
