import Content from "features/layout/components/Content";
import Footer from "features/layout/components/Footer";
import Header from "features/layout/components/Header";
import { appRoutes } from "features/routing/constants";
import { useCurrentRoute } from "features/routing/hooks";
import React, { ReactElement } from "react";

export interface Props {
    ["data-testid"]?: string;
    children: ReactElement;
}

const Page = ({ "data-testid": testId = "page", children }: Props) => {
    const currentRoute = useCurrentRoute();

    return currentRoute !== appRoutes.landingPage ? (
        <div data-testid={testId}>
            <Header />
            <Content>{children}</Content>
            <Footer />
        </div>
    ) : (
        <>{children}</>
    );
};

export default Page;
