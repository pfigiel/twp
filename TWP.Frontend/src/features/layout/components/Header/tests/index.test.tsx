import { render } from "@testing-library/react";
import config from "config";
import { useHistory } from "react-router-dom";
import { fireClickEvent, withReduxProvider } from "tests/utils";
import { mocked } from "ts-jest/utils";
import Header from "..";

jest.mock("react-router-dom", () => ({ ...(jest.requireActual("react-router-dom") as any), useHistory: jest.fn() }));

describe("layout", () => {
    describe("components", () => {
        describe("Header", () => {
            const testId = "header";

            const renderComponent = () => render(withReduxProvider(<Header data-testid={testId} />));

            it("Should redirect to landing page when brand gets clicked.", () => {
                // given
                const push = jest.fn();
                mocked(useHistory).mockReturnValue({ ...useHistory(), push });
                const { getByTestId } = renderComponent();

                // when
                fireClickEvent(getByTestId(`${testId}__brand`));

                // then
                expect(push).toHaveBeenCalledWith(config.appRoutes.landingPage);
            });
        });
    });
});
