import Page from "features/layout/components/Page";
import RouterSwitch from "features/routing/components/RouterSwitch";
import { BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Page>
                    <RouterSwitch />
                </Page>
            </BrowserRouter>
        </div>
    );
};

export default App;
