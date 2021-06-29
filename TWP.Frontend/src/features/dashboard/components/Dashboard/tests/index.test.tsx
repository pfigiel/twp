import { render } from "@testing-library/react";
import { appRoutes } from "features/routing/constants";
import { useHistory } from "react-router-dom";
import { fireClickEvent, withIntlProvider } from "tests/utils";
import { mocked } from "ts-jest/utils";
import Dashboard from "..";

jest.mock("react-router-dom", () => ({ ...(jest.requireActual("react-router-dom") as object), useHistory: jest.fn() }));

describe("dashboard", () => {
    describe("components", () => {
        const testId = "dashboard";

        describe("Dashboard", () => {
            const renderComponent = () => render(withIntlProvider(<Dashboard data-testid={testId} />));

            it("Should redirect to songs when songs tile gets clicked.", () => {
                // given
                const push = jest.fn();
                mocked(useHistory).mockReturnValue({ push } as any);
                const { getByTestId } = renderComponent();

                // when
                fireClickEvent(getByTestId(`${testId}__songs-tile`));

                // then
                expect(push).toHaveBeenCalledWith(appRoutes.songs);
            });
        });
    });
});
