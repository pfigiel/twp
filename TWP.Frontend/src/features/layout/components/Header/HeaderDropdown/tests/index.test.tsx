import { render } from "@testing-library/react";
import { DropdownOption } from "features/common/components/Dropdown";
import { fireClickEvent } from "tests/utils";
import HeaderDropdown, { Props } from "..";

describe("layout", () => {
    describe("components", () => {
        describe("Header", () => {
            describe("HeaderDropdown", () => {
                const testId = "header-dropdown";
                const testOptions: DropdownOption<string>[] = [
                    {
                        display: "testOne",
                        value: "testOne",
                    },
                    {
                        display: "testTwo",
                        value: "testTwo",
                    },
                    {
                        display: "testThree",
                        value: "testThree",
                    },
                ];

                const renderComponent = (props: Partial<Props<string>> = {}) => {
                    const { options = testOptions, selectedOption = testOptions[0], onSelect = jest.fn() } = props;

                    return render(
                        <HeaderDropdown options={options} selectedOption={selectedOption} onSelect={onSelect} />
                    );
                };

                it("Should render toggle icon.", () => {
                    // given & when
                    const { getByTestId } = renderComponent();

                    // then
                    expect(getByTestId(`${testId}__toggle-icon`)).toBeInTheDocument();
                });

                it("Should apply --rotated class modifier to toggle icon when dropdown gets expanded.", () => {
                    // given
                    const { getByTestId } = renderComponent();

                    // when
                    fireClickEvent(getByTestId(`${testId}__toggle`));

                    // then
                    expect(getByTestId(`${testId}__toggle-icon`)).toHaveClass("header-dropdown__toggle-icon--rotated");
                });
            });
        });
    });
});
