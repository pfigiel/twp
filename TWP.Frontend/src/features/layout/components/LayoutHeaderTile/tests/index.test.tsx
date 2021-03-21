import { render } from "@testing-library/react";
import LayoutHeaderTile, { Props } from "..";

describe("layout", () => {
    describe("components", () => {
        describe("LayoutHeaderTile", () => {
            const testId = "layout-header-tile";

            const renderComponent = (props: Partial<Props> = {}) => {
                const { title = "", content } = props;

                return render(<LayoutHeaderTile title={title} content={content} />);
            };

            it("Should render title.", () => {
                // given
                const title = "title";

                // when
                const { getByTestId } = renderComponent({ title });

                // then
                expect(getByTestId(`${testId}`)).toHaveTextContent(title);
            });

            it("Should render content when provided.", () => {
                // given
                const contentTestId = "child";
                const content = <div data-testid={contentTestId} />;

                // when
                const { getByTestId } = renderComponent({ content });

                // then
                expect(getByTestId(contentTestId)).toBeInTheDocument();
            });
        });
    });
});
