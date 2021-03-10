import { Locale } from "features/common/types";
import Page from "features/layout/components/Page";
import RouterSwitch from "features/routing/components/RouterSwitch";
import { getMessages } from "intl";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";

interface Props {
    locale: Locale;
}

const App = ({ locale }: Props) => (
    <IntlProvider locale={locale} messages={getMessages(locale)}>
        <BrowserRouter>
            <Page>
                <RouterSwitch />
            </Page>
        </BrowserRouter>
    </IntlProvider>
);

export default App;
