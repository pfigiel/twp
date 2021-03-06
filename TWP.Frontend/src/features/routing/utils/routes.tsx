import config from "config";
import LandingPage from "features/landingPage/components/LandingPage";
import Dashboard from "features/routing/components/Pages/Dashboard";
import SongsList from "features/routing/components/Pages/SongsList";
import { AppRoute } from "features/routing/types";
import React from "react";

const routes: AppRoute[] = [
    {
        path: config.appRoutes.dashboard,
        component: <Dashboard />,
        exact: true,
    },
    {
        path: config.appRoutes.landingPage,
        component: <LandingPage />,
        exact: true,
    },
    {
        path: config.appRoutes.songs,
        component: <SongsList />,
        exact: true,
    },
    {
        path: "*",
        component: <div>Error</div>,
    },
];

export default routes;
