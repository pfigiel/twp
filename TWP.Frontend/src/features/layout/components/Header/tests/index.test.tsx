import { render } from "@testing-library/react";
import { useDeviceClass } from "features/common/hooks";
import { DeviceClass } from "features/common/types";
import { appRoutes } from "features/routing/constants";
import each from "jest-each";
import { useHistory } from "react-router-dom";
import { fireClickEvent, withIntlProvider, withReduxProvider } from "tests/utils";
import { mocked } from "ts-jest/utils";
import Header from "..";

jest.mock("react-router-dom", () => ({ ...(jest.requireActual("react-router-dom") as object), useHistory: jest.fn() }));
jest.mock("features/common/hooks", () => ({
    ...(jest.requireActual("features/common/hooks") as any),
    useDeviceClass: jest.fn(),
}));

describe("layout", () => {
    describe("components", () => {
        describe("Header", () => {
            const testId = "header";

            const renderComponent = () => render(withReduxProvider(withIntlProvider(<Header data-testid={testId} />)));

            it("Should render brand on desktop.", () => {
                // given
                mocked(useDeviceClass).mockReturnValue("desktop");

                // when
                const { getByTestId } = renderComponent();

                // then
                expect(getByTestId(`${testId}__logo`)).toBeInTheDocument();
            });

            each(["smartphone", "tablet"]).it("Should not render brand on %p.", (deviceClass: DeviceClass) => {
                // given
                mocked(useDeviceClass).mockReturnValue(deviceClass);

                // when
                const { queryByTestId } = renderComponent();

                // then
                expect(queryByTestId(`${testId}__logo`)).not.toBeInTheDocument();
            });

            it("Should redirect to landing page when brand gets clicked on desktop.", () => {
                // given
                const push = jest.fn();
                mocked(useHistory).mockReturnValue({ push } as any);
                mocked(useDeviceClass).mockReturnValue("desktop");
                const { getByTestId } = renderComponent();

                // when
                fireClickEvent(getByTestId(`${testId}__logo`));

                // then
                expect(push).toHaveBeenCalledWith(appRoutes.landingPage);
            });
        });
    });
});
