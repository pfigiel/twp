import { render } from "@testing-library/react";
import Loader, { Props } from "..";

describe("common", () => {
    describe("components", () => {
        describe("Loader", () => {
            const testId = "loader";

            const renderComponent = (props: Partial<Props> = {}) => {
                const { className } = props;

                return render(<Loader data-testid={testId} className={className} />);
            };

            it("Should use custom class name when provided.", () => {
                // given
                const className = "class";

                // when
                const { getByTestId } = renderComponent({ className });

                // then
                expect(getByTestId(testId)).toHaveClass(className);
            });
        });
    });
});
