import { render } from "@testing-library/react";
import App from "App";
import { withReduxProvider } from "tests/utils";

describe("App", () => {
    it("Should render without errors.", () => {
        // given & when & then
        render(withReduxProvider(<App />));
    });
});
