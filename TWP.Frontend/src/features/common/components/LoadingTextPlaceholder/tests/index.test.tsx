import { render } from "@testing-library/react";
import LoadingTextPlaceholder, { Props } from "..";

describe("common", () => {
    describe("components", () => {
        describe("LoadingTextPlaceholder", () => {
            const testId = "loading-text-placeholder";

            const renderComponent = (props: Partial<Props> = {}) => {
                const { lineLength, lineCount, lineLengthVariation } = props;

                return render(
                    <LoadingTextPlaceholder
                        data-testid={testId}
                        lineLength={lineLength}
                        lineCount={lineCount}
                        lineLengthVariation={lineLengthVariation}
                    />
                );
            };

            it("Should render a single line placeholder text with given length.", () => {
                // given
                const lineLength = 5;

                // when
                const { getByTestId } = renderComponent({ lineLength });

                // then
                expect(getByTestId(`${testId}__line`)).toHaveTextContent(
                    new Array<string>(lineLength).fill("▇").join("")
                );
            });

            it("Should render multiple line placeholder text with given lines count.", () => {
                // given
                const lineCount = 5;

                // when
                const { getAllByTestId } = renderComponent({ lineCount });

                // then
                expect(getAllByTestId(`${testId}__line`)).toHaveLength(lineCount);
            });
        });
    });
});
