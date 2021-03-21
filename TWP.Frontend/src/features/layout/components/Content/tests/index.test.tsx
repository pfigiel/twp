import { render } from "@testing-library/react";
import config from "config";
import { useCurrentRoute } from "features/routing/hooks";
import { Fragment } from "react";
import { mocked } from "ts-jest/utils";
import Content, { Props } from "..";

jest.mock("features/routing/hooks", () => ({
    ...(jest.requireActual("features/routing/hooks") as any),
    useCurrentRoute: jest.fn(),
}));

describe("layout", () => {
    describe("components", () => {
        describe("Content", () => {
            const testId = "content";

            const renderComponent = (props: Partial<Props> = {}) => {
                const { children = <Fragment /> } = props;

                return render(<Content data-testid={testId}>{children}</Content>);
            };

            it("Should render children.", () => {
                // given
                const childTestId = "child";
                const children = <div data-testid={childTestId} />;

                // when
                const { getByTestId } = renderComponent({ children });

                // then
                expect(getByTestId(childTestId)).toBeInTheDocument();
            });

            it("Should apply --no-mobile-shadow modifier if current route is dashboard.", () => {
                // given
                mocked(useCurrentRoute).mockReturnValue(config.appRoutes.dashboard);

                // when
                const { getByTestId } = renderComponent();

                // then
                expect(getByTestId(`${testId}__middle-section`)).toHaveClass(
                    "content__middle-section--no-mobile-shadow"
                );
            });
        });
    });
});
