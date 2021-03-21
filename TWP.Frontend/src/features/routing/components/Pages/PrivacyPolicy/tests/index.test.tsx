import { render } from "@testing-library/react";
import { withIntlProvider } from "tests/utils";
import PrivacyPolicy from "..";

describe("routing", () => {
    describe("components", () => {
        describe("Pages", () => {
            describe("PrivacyPolicy", () => {
                it("Should render without errors.", () => {
                    render(withIntlProvider(<PrivacyPolicy />));
                });
            });
        });
    });
});
