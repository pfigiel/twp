import { render } from "@testing-library/react";
import { Fragment } from "react";
import ClickAwayListener from "react-click-away-listener";
import { actClick } from "tests/utils";
import { Props } from "..";

describe("common", () => {
    describe("ClickAwayListener", () => {
        const otherElementTestId = "other-element";

        const renderComponent = (props: Partial<Props> = {}) => {
            const { children = <Fragment />, onClickAway = jest.fn() } = props;

            return render(
                <>
                    <ClickAwayListener onClickAway={onClickAway}>{children}</ClickAwayListener>
                    <div data-testid={otherElementTestId} />
                </>
            );
        };

        it("Should render children.", () => {
            // given
            const childrenTestId = "children";
            const children = <div data-testid={childrenTestId} />;

            // when
            const { getByTestId } = renderComponent({ children });

            // then
            expect(getByTestId(childrenTestId)).toBeInTheDocument();
        });

        it("Should fire onClickAway callback when user clicks away.", () => {
            // given
            const onClickAway = jest.fn();
            const { getByTestId } = renderComponent({ onClickAway });

            // when
            actClick(getByTestId(otherElementTestId));

            // then
            expect(onClickAway).toHaveBeenCalled();
        });
    });
});
