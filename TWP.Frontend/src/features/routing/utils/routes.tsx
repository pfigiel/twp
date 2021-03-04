import config from "config";
import Dashboard from "features/dashboard/components/Dashboard";
import LandingPage from "features/landingPage/components/LandingPage";
import { AppRoute } from "features/routing/types";
import React from "react";

const routes: AppRoute[] = [
    {
        path: config.appRoutes.landingPage,
        component: <LandingPage />,
        exact: true,
    },
    {
        path: config.appRoutes.dashboard,
        component: <Dashboard />,
        exact: true,
    },
];

export default routes;
