import App from "App";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reportWebVitals from "reportWebVitals";
import store from "store";
import "styles/styles.scss";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store()}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
