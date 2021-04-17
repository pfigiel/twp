import { setLocale } from "features/common/actions";
import { defaultLocale } from "features/common/constants";
import { Locale } from "features/common/types";
import Page from "features/layout/components/Page";
import { getLocaleFromStorage } from "features/layout/utils";
import RouterSwitch from "features/routing/components/RouterSwitch";
import AuthenticationGateway from "features/user/components/AuthenticationGateway";
import { getMessages } from "intl";
import React, { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";

interface LocaleInitializerProps {
    children: ReactElement;
}

const LocaleInitializer = ({ children }: LocaleInitializerProps) => {
    useDispatch()(setLocale((getLocaleFromStorage() as Locale) ?? defaultLocale));

    return children;
};

interface Props {
    locale: Locale;
}

const App = ({ locale }: Props) => (
    <IntlProvider locale={locale} messages={getMessages(locale)}>
        <LocaleInitializer>
            <AuthenticationGateway>
                <BrowserRouter>
                    <Page>
                        <RouterSwitch />
                    </Page>
                </BrowserRouter>
            </AuthenticationGateway>
        </LocaleInitializer>
    </IntlProvider>
);

export default App;
