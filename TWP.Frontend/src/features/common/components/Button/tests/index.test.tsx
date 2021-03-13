import { render } from "@testing-library/react";
import React, { Fragment } from "react";
import { fireClickEvent } from "tests/utils";
import Button, { Props } from "..";

describe("common", () => {
    describe("components", () => {
        describe("Button", () => {
            const testId = "button";

            const renderComponent = (props: Partial<Props> = {}) => {
                const { className, children = <Fragment />, variant, onClick = jest.fn() } = props;

                return render(
                    <Button className={className} variant={variant} onClick={onClick}>
                        {children}
                    </Button>
                );
            };

            it("Should use custom class name when provided.", () => {
                // given
                const className = "test-class";

                // when
                const { getByTestId } = renderComponent({ className });

                // then
                expect(getByTestId(testId)).toHaveClass(className);
            });

            it("Should add --secondary class modifier when variant is secondary.", () => {
                // given & when
                const { getByTestId } = renderComponent({ variant: "secondary" });

                // then
                expect(getByTestId(testId)).toHaveClass("button--secondary");
            });

            it("Should fire onClick callback when button gets clicked.", () => {
                // given
                const onClick = jest.fn();
                const { getByTestId } = renderComponent({ onClick });

                // when
                fireClickEvent(getByTestId(testId));

                // then
                expect(onClick).toHaveBeenCalled();
            });
        });
    });
});
