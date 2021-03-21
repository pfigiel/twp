import { render } from "@testing-library/react";
import { DeviceClass } from "features/common/types";
import each from "jest-each";
import { withIntlProvider } from "tests/utils";
import Navigation, { Props } from "..";

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

                each(["smartphone", "tablet"]).it("Should render nav dropdown on %p.", (deviceClass: DeviceClass) => {
                    // given & when
                    const { getByTestId, queryByTestId } = renderComponent({ deviceClass });

                    // then
                    expect(queryByTestId(`${testId}__desktop-nav-links`)).not.toBeInTheDocument();
                    expect(getByTestId(`${testId}__nav-dropdown`)).toBeInTheDocument();
                });
            });
        });
    });
});
