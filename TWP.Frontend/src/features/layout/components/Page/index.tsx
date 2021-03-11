import config from "config";
import Content from "features/layout/components/Content";
import Footer from "features/layout/components/Footer";
import Header from "features/layout/components/Header";
import { useCurrentRoute } from "features/routing/hooks";
import React, { ReactElement } from "react";

interface Props {
    children: ReactElement;
}

const Page = ({ children }: Props) => {
    const currentRoute = useCurrentRoute();

    return currentRoute !== config.appRoutes.landingPage ? (
        <div>
            <Header />
            <Content>{children}</Content>
            <Footer />
        </div>
    ) : (
        <>{children}</>
    );
};

export default Page;
