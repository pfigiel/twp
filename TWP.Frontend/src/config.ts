const config = {
    apiRoutes: {
        base: "https://localhost:5001/api/",
        healthcheck: "healthcheck/",
    },
    appRoutes: {
        dashboard: "/dashboard",
        landingPage: "/",
        myCollections: "/my-collections",
        privacyPolicy: "/privacy-policy",
        regulations: "/regulations",
        songs: "/songs",
        songCreator: "/song-creator",
    },
    deviceBreakpoints: {
        smartphone: 641,
        tablet: 1025,
    },
};

export default config;
