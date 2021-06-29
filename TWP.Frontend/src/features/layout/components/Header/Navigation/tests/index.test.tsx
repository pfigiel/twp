import { render } from "@testing-library/react";
import { DeviceClass } from "features/common/types";
import { appRoutes } from "features/routing/constants";
import each from "jest-each";
import { useHistory } from "react-router-dom";
import { fireClickEvent, withIntlProvider } from "tests/utils";
import { mocked } from "ts-jest/utils";
import Navigation, { Props } from "..";

jest.mock("react-router-dom", () => ({ ...(jest.requireActual("react-router-dom") as object), useHistory: jest.fn() }));

describe("layout", () => {
    describe("components", () => {
        describe("Header", () => {
            describe("Navigation", () => {
                const testId = "navigation";

                const renderComponent = (props: Partial<Props> = {}) => {
                    const { deviceClass = "desktop" } = props;

                    return render(withIntlProvider(<Navigation deviceClass={deviceClass} data-testid={testId} />));
                };

                it("Should desktop nav links be visible on desktop.", () => {
                    // given & when
                    const { getByTestId, queryByTestId } = renderComponent({ deviceClass: "desktop" });

                    // then
                    expect(getByTestId(`${testId}__desktop-nav-links`)).toBeInTheDocument();
                    expect(queryByTestId(`${testId}__nav-dropdown`)).not.toBeInTheDocument();
                });

                each(["smartphone", "tablet"]).it(
                    "Should not render desktop nav links on %p.",
                    (deviceClass: DeviceClass) => {
                        // given & when
                        const { queryByTestId } = renderComponent({ deviceClass });

                        // then
                        expect(queryByTestId(`${testId}__desktop-nav-links`)).not.toBeInTheDocument();
                    }
                );

                each([
                    [appRoutes.dashboard, 0],
                    [appRoutes.songs, 1],
                    [appRoutes.collections, 2],
                    [appRoutes.editor, 3],
                ]).it(
                    "Should redirect to %p when nav link is clicked on desktop.",
                    (route: string, linkIndex: number) => {
                        // given
                        const push = jest.fn();
                        mocked(useHistory).mockReturnValue({ push } as any);
                        const { getAllByTestId } = renderComponent({ deviceClass: "desktop" });

                        // when
                        fireClickEvent(getAllByTestId(`${testId}__desktop-nav-link`)[linkIndex]);

                        // then
                        expect(push).toHaveBeenCalledWith(route);
                    }
                );
            });
        });
    });
});
