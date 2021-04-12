import { render } from "@testing-library/react";
import { withIntlProvider } from "tests/utils";
import FullScreenLoader from "..";

describe("layout", () => {
    describe("components", () => {
        describe("FullScreenLoader", () => {
            const testId = "full-screen-loader";

            const renderComponent = () => render(withIntlProvider(<FullScreenLoader data-testid={testId} />));

            it("Should render component.", () => {
                // given & when
                const { getByTestId } = renderComponent();

                // then
                expect(getByTestId(testId)).toBeInTheDocument();
            });
        });
    });
});
