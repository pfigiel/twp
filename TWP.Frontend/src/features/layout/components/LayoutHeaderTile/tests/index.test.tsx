import { render } from "@testing-library/react";
import LayoutHeaderTile, { Props } from "..";

describe("layout", () => {
    describe("components", () => {
        describe("LayoutHeaderTile", () => {
            const testId = "layout-header-tile";

            const renderComponent = (props: Partial<Props> = {}) => {
                const { title = "" } = props;

                return render(<LayoutHeaderTile title={title} />);
            };

            it("Should render title.", () => {
                // given
                const title = "title";

                // when
                const { getByTestId } = renderComponent({ title });

                // then
                expect(getByTestId(`${testId}`)).toHaveTextContent(title);
            });
        });
    });
});
