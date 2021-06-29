import LandingPage from "features/landingPage/components/LandingPage";
import Dashboard from "features/routing/components/Pages/Dashboard";
import Editor from "features/routing/components/Pages/Editor";
import PrivacyPolicy from "features/routing/components/Pages/PrivacyPolicy";
import Regulations from "features/routing/components/Pages/Regulations";
import SignIn from "features/routing/components/Pages/SignIn";
import SignOut from "features/routing/components/Pages/SignOut";
import SignUp from "features/routing/components/Pages/SignUp";
import Song from "features/routing/components/Pages/Song";
import SongsList from "features/routing/components/Pages/SongsList";
import { AppRoute } from "features/routing/types";

export const appRoutes = {
    collections: "/collections",
    dashboard: "/dashboard",
    editor: "/editor",
    landingPage: "/",
    privacyPolicy: "/privacy-policy",
    regulations: "/regulations",
    signIn: "/sign-in",
    signOut: "/sign-out",
    signUp: "/sign-up",
    songs: "/songs",
    songCreator: "/song-creator",
};

export const routes: AppRoute[] = [
    {
        path: appRoutes.dashboard,
        component: <Dashboard />,
        exact: true,
    },
    {
        path: appRoutes.editor,
        component: <Editor />,
        exact: true,
    },
    {
        path: appRoutes.landingPage,
        component: <LandingPage />,
        exact: true,
    },
    {
        path: appRoutes.privacyPolicy,
        component: <PrivacyPolicy />,
        exact: true,
    },
    {
        path: appRoutes.regulations,
        component: <Regulations />,
        exact: true,
    },
    {
        path: appRoutes.signIn,
        component: <SignIn />,
        exact: true,
    },
    {
        path: appRoutes.signOut,
        component: <SignOut />,
        exact: true,
    },
    {
        path: appRoutes.signUp,
        component: <SignUp />,
        exact: true,
    },
    {
        path: `${appRoutes.songs}/:id`,
        component: <Song />,
        exact: true,
    },
    {
        path: appRoutes.songs,
        component: <SongsList />,
        exact: true,
    },
    {
        path: "*",
        component: <div>Error</div>,
    },
];
