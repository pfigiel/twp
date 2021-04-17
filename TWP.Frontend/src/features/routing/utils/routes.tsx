import config from "config";
import LandingPage from "features/landingPage/components/LandingPage";
import Dashboard from "features/routing/components/Pages/Dashboard";
import PrivacyPolicy from "features/routing/components/Pages/PrivacyPolicy";
import Regulations from "features/routing/components/Pages/Regulations";
import SignIn from "features/routing/components/Pages/SignIn";
import SignOut from "features/routing/components/Pages/SignOut";
import SignUp from "features/routing/components/Pages/SignUp";
import Song from "features/routing/components/Pages/Song";
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
        path: config.appRoutes.privacyPolicy,
        component: <PrivacyPolicy />,
        exact: true,
    },
    {
        path: config.appRoutes.regulations,
        component: <Regulations />,
        exact: true,
    },
    {
        path: config.appRoutes.signIn,
        component: <SignIn />,
        exact: true,
    },
    {
        path: config.appRoutes.signOut,
        component: <SignOut />,
        exact: true,
    },
    {
        path: config.appRoutes.signUp,
        component: <SignUp />,
        exact: true,
    },
    {
        path: `${config.appRoutes.songs}/:id`,
        component: <Song />,
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
