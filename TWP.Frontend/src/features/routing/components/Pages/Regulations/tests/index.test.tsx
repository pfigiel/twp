import { render } from "@testing-library/react";
import { withIntlProvider } from "tests/utils";
import Regulations from "..";

describe("routing", () => {
    describe("components", () => {
        describe("Pages", () => {
            describe("Regulations", () => {
                it("Should render without errors.", () => {
                    render(withIntlProvider(<Regulations />));
                });
            });
        });
    });
});
