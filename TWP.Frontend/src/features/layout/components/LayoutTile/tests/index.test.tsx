import { render } from "@testing-library/react";
import { Fragment } from "react";
import LayoutTile, { Props } from "..";

describe("layout", () => {
    describe("components", () => {
        describe("LayoutTile", () => {
            const renderComponent = (props: Partial<Props> = {}) => {
                const { children = <Fragment /> } = props;

                return render(<LayoutTile>{children}</LayoutTile>);
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
        });
    });
});
