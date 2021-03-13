import { render } from "@testing-library/react";
import config from "config";
import { useCurrentRoute } from "features/routing/hooks";
import { Fragment } from "react";
import { withIntlProvider, withReduxProvider } from "tests/utils";
import { mocked } from "ts-jest/utils";
import Page, { Props } from "..";

jest.mock("features/routing/hooks", () => ({
    ...(jest.requireActual("features/routing/hooks") as any),
    useCurrentRoute: jest.fn(),
}));

describe("layout", () => {
    describe("components", () => {
        describe("Page", () => {
            const testId = "page";
            const childTestId = "child";
            const children = <div data-testid={childTestId} />;

            const renderComponent = (props: Partial<Props> = {}) => {
                const { children = <Fragment /> } = props;

                return render(withReduxProvider(withIntlProvider(<Page data-testid={testId}>{children}</Page>)));
            };

            it("Should render page and children when current route is other than landing page.", () => {
                // given
                mocked(useCurrentRoute).mockReturnValue(config.appRoutes.dashboard);

                // when
                const { getByTestId } = renderComponent({ children });

                // then
                expect(getByTestId(testId)).toBeInTheDocument();
                expect(getByTestId(childTestId)).toBeInTheDocument();
            });

            it("Should only render children when current route is landing page.", () => {
                // given
                mocked(useCurrentRoute).mockReturnValue(config.appRoutes.landingPage);

                // when
                const { getByTestId, queryByTestId } = renderComponent({ children });

                // then
                expect(queryByTestId(testId)).not.toBeInTheDocument();
                expect(getByTestId(childTestId)).toBeInTheDocument();
            });
        });
    });
});
