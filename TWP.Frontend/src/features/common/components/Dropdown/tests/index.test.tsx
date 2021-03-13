import { render } from "@testing-library/react";
import { fireClickEvent } from "tests/utils";
import Dropdown, { DropdownOption, Props } from "..";

describe("common", () => {
    describe("components", () => {
        describe("Dropdown", () => {
            const testId = "dropdown";
            const otherElementTestId = "other-element";
            const testOptions: DropdownOption<number>[] = [
                {
                    display: "optionOne",
                    value: 1,
                },
                {
                    display: "optionTwo",
                    value: 2,
                },
            ];

            const renderComponent = (props: Partial<Props<number>> = {}) => {
                const {
                    className,
                    toggleClassName,
                    optionsClassName,
                    optionClassName,
                    selectedOptionClassName,
                    options = testOptions,
                    selectedOption,
                    toggle,
                    placeholder,
                    onSelect = jest.fn(),
                    onToggle,
                } = props;

                return render(
                    <>
                        <Dropdown
                            data-testid={testId}
                            className={className}
                            toggleClassName={toggleClassName}
                            optionsClassName={optionsClassName}
                            optionClassName={optionClassName}
                            selectedOptionClassName={selectedOptionClassName}
                            options={options}
                            selectedOption={selectedOption}
                            toggle={toggle}
                            placeholder={placeholder}
                            onSelect={onSelect}
                            onToggle={onToggle}
                        />
                        <div data-testid={otherElementTestId} />
                    </>
                );
            };

            it("Should render custom toggle when provided.", () => {
                // given
                const toggle = "testToggle";

                // when
                const { getByTestId } = renderComponent({ toggle });

                // then
                expect(getByTestId(`${testId}__toggle`)).toHaveTextContent(toggle);
            });

            it("Should render placeholder when no custom toggle is provided and no option is selected.", () => {
                // given
                const placeholder = "testToggle";

                // when
                const { getByTestId } = renderComponent({ placeholder });

                // then
                expect(getByTestId(`${testId}__toggle`)).toHaveTextContent(placeholder);
            });

            it("Should use custom class name when provided.", () => {
                // given
                const className = "test-class";

                // when
                const { getByTestId } = renderComponent({ className });

                // then
                expect(getByTestId(testId)).toHaveClass(className);
            });

            it("Should use custom toggle class name when provided.", () => {
                // given
                const toggleClassName = "test-class";

                // when
                const { getByTestId } = renderComponent({ toggleClassName });

                // then
                expect(getByTestId(`${testId}__toggle`)).toHaveClass(toggleClassName);
            });

            it("Should use custom options class name when provided.", () => {
                // given
                const optionsClassName = "test-class";

                // when
                const { getByTestId } = renderComponent({ optionsClassName });

                // then
                expect(getByTestId(`${testId}__options`)).toHaveClass(optionsClassName);
            });

            it("Should render options.", () => {
                // given & when
                const { getAllByTestId } = renderComponent();

                // then
                expect(getAllByTestId(`${testId}__option`)).toHaveLength(testOptions.length);
            });

            it("Should options initially have --hidden class modifier.", () => {
                // given & when
                const { getByTestId } = renderComponent();

                // then
                expect(getByTestId(`${testId}__options`)).toHaveClass("dropdown__options--hidden");
            });

            it("Should use custom option class name for each option when provided.", () => {
                // given
                const optionClassName = "test-class";

                // when
                const { getAllByTestId } = renderComponent({ optionClassName });

                // then
                for (const option of getAllByTestId(`${testId}__option`)) {
                    expect(option).toHaveClass(optionClassName);
                }
            });

            it("Should remove --hidden class modifier from options when options are hidden and toggle gets clicked.", () => {
                // given
                const { getByTestId } = renderComponent();

                // when
                fireClickEvent(getByTestId(`${testId}__toggle`));

                // then
                expect(getByTestId(`${testId}__options`)).not.toHaveClass("dropdown__options--hidden");
            });

            it("Should add --hidden class modifier to options when options are visible and user clicks away.", () => {
                // given
                const { getByTestId } = renderComponent();
                fireClickEvent(getByTestId(`${testId}__toggle`));

                // when
                fireClickEvent(getByTestId(`${otherElementTestId}`));

                // then
                expect(getByTestId(`${testId}__options`)).toHaveClass("dropdown__options--hidden");
            });

            it("Should add --hidden class modifier to options when options are visible and toggle gets clicked.", () => {
                // given
                const { getByTestId } = renderComponent();
                fireClickEvent(getByTestId(`${testId}__toggle`));

                // when
                fireClickEvent(getByTestId(`${testId}__toggle`));

                // then
                expect(getByTestId(`${testId}__options`)).toHaveClass("dropdown__options--hidden");
            });

            it("Should add --hidden class modifier to options when options are visible and option gets clicked.", () => {
                // given
                const { getByTestId, getAllByTestId } = renderComponent();
                fireClickEvent(getByTestId(`${testId}__toggle`));

                // when
                fireClickEvent(getAllByTestId(`${testId}__option`)[0]);

                // then
                expect(getByTestId(`${testId}__options`)).toHaveClass("dropdown__options--hidden");
            });

            it("Should fire onSelect callback when option gets clicked.", () => {
                // given
                const selectedOptionIndex = 0;
                const onSelect = jest.fn();
                const { getByTestId, getAllByTestId } = renderComponent({ onSelect });
                fireClickEvent(getByTestId(`${testId}__toggle`));

                // when
                fireClickEvent(getAllByTestId(`${testId}__option`)[selectedOptionIndex]);

                // then
                expect(onSelect).toHaveBeenCalledWith(testOptions[selectedOptionIndex].value);
            });

            it("Should fire onToggle callback when options change the visibility state.", () => {
                // given
                const onToggle = jest.fn();
                const { getByTestId } = renderComponent({ onToggle });

                // when & then
                fireClickEvent(getByTestId(`${testId}__toggle`));
                expect(onToggle).toHaveBeenCalledWith(true);

                fireClickEvent(getByTestId(`${testId}__toggle`));
                expect(onToggle).toHaveBeenLastCalledWith(false);
            });
        });
    });
});
