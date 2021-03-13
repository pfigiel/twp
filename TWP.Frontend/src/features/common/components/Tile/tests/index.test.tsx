import { render } from "@testing-library/react";
import React, { Fragment } from "react";
import { fireClickEvent } from "tests/utils";
import Tile, { Props } from "..";

describe("common", () => {
    describe("components", () => {
        describe("Tile", () => {
            const testId = "tile";

            const renderClickableComponent = (props: Partial<Props> = {}) => {
                const { className, children = <Fragment />, onClick = jest.fn() } = props;

                return render(
                    <Tile data-testid={testId} className={className} clickable onClick={onClick}>
                        {children}
                    </Tile>
                );
            };

            const renderNonClickableComponent = () =>
                render(
                    <Tile data-testid={testId}>
                        <Fragment />
                    </Tile>
                );

            it("Should add --clickable class modifier when clickable prop is set.", () => {
                // given & when
                const { getByTestId } = renderClickableComponent();

                // then
                expect(getByTestId(testId)).toHaveClass("tile--clickable");
            });

            it("Should not add --clickable class modifier when clickable prop is not set.", () => {
                // given & when
                const { getByTestId } = renderNonClickableComponent();

                // then
                expect(getByTestId(testId)).not.toHaveClass("tile--clickable");
            });

            it("Should use custom class name when provided.", () => {
                // given
                const className = "test-class";

                // when
                const { getByTestId } = renderClickableComponent({ className });

                // then
                expect(getByTestId(testId)).toHaveClass(className);
            });

            it("Should render children.", () => {
                // given
                const childTestId = "child";
                const children = <div data-testid={childTestId} />;

                // when
                const { getByTestId } = renderClickableComponent({ children });

                // then
                expect(getByTestId(childTestId)).toBeInTheDocument();
            });

            it("Should fire onClick callback when tile gets clicked.", () => {
                // given
                const onClick = jest.fn();
                const { getByTestId } = renderClickableComponent({ onClick });

                // when
                fireClickEvent(getByTestId(testId));

                // then
                expect(onClick).toHaveBeenCalled();
            });
        });
    });
});
