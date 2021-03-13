import { render } from "@testing-library/react";
import config from "config";
import { useHistory } from "react-router-dom";
import { fireClickEvent } from "tests/utils";
import { mocked } from "ts-jest/utils";
import Dashboard from "..";

jest.mock("react-router-dom", () => ({ ...(jest.requireActual("react-router-dom") as any), useHistory: jest.fn() }));

describe("dashboard", () => {
    describe("components", () => {
        const testId = "dashboard";

        describe("Dashboard", () => {
            const renderComponent = () => render(<Dashboard data-testid={testId} />);

            it("Should redirect to songs when songs tile gets clicked.", () => {
                // given
                const push = jest.fn();
                mocked(useHistory).mockReturnValue({ ...useHistory(), push });
                const { getByTestId } = renderComponent();

                // when
                fireClickEvent(getByTestId(`${testId}__songs-tile`));

                // then
                expect(push).toHaveBeenCalledWith(config.appRoutes.songs);
            });
        });
    });
});
