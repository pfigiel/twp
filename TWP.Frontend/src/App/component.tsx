import { Locale } from "features/common/types";
import Page from "features/layout/components/Page";
import RouterSwitch from "features/routing/components/RouterSwitch";
import AuthenticationGateway from "features/user/components/AuthenticationGateway";
import { getMessages } from "intl";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";

interface Props {
    locale: Locale;
}

const App = ({ locale }: Props) => (
    <IntlProvider locale={locale} messages={getMessages(locale)}>
        <AuthenticationGateway>
            <BrowserRouter>
                <Page>
                    <RouterSwitch />
                </Page>
            </BrowserRouter>
        </AuthenticationGateway>
    </IntlProvider>
);

export default App;
