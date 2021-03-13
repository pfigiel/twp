import { render } from "@testing-library/react";
import { Fragment } from "react";
import Content, { Props } from "..";

describe("layout", () => {
    describe("components", () => {
        describe("Content", () => {
            const renderComponent = (props: Partial<Props> = {}) => {
                const { children = <Fragment /> } = props;

                return render(<Content>{children}</Content>);
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
