import { render } from "@testing-library/react";
import { fireBlurEvent, fireChangeEvent, fireClickEvent, fireFocusEvent, withIntlProvider } from "tests/utils";
import Input, { Props } from "..";

describe("common", () => {
    describe("components", () => {
        describe("Input", () => {
            const testId = "input";

            const renderComponent = (props: Partial<Props> = {}) => {
                const {
                    containerClassName,
                    label = "",
                    value,
                    max,
                    error,
                    helperMessage,
                    required,
                    type,
                    withPasswordLookup,
                    onChange = jest.fn(),
                    onBlur,
                } = props;

                return render(
                    withIntlProvider(
                        <Input
                            data-testid={testId}
                            containerClassName={containerClassName}
                            label={label}
                            value={value}
                            max={max}
                            error={error}
                            helperMessage={helperMessage}
                            required={required}
                            type={type}
                            withPasswordLookup={withPasswordLookup}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                    )
                );
            };

            it("Should use container class name when provided.", () => {
                // given
                const containerClassName = "container";

                // when
                const { getByTestId } = renderComponent({ containerClassName });

                // then
                expect(getByTestId(`${testId}__container`)).toHaveClass(containerClassName);
            });

            it("Should add 'focused' class modifier to the container when input is focused.", () => {
                // given
                const { getByTestId } = renderComponent();

                // when
                fireFocusEvent(getByTestId(testId));

                // then
                expect(getByTestId(`${testId}__container`)).toHaveClass("input__container--focused");
            });

            it("Should add 'error' modifier to container class when error is defined.", () => {
                // given & when
                const { getByTestId } = renderComponent({ error: "error" });

                // then
                expect(getByTestId(`${testId}__container`)).toHaveClass("input__container--error");
            });

            it("Should render label.", () => {
                // given
                const label = "label";

                // when
                const { getByTestId } = renderComponent({ label });

                // then
                expect(getByTestId(`${testId}__label`)).toHaveTextContent(label);
            });

            it("Should add 'floating' class to the label when input is focused.", () => {
                // given
                const { getByTestId } = renderComponent({ label: "label" });

                // when
                fireFocusEvent(getByTestId(testId));

                // then
                expect(getByTestId(`${testId}__label`)).toHaveClass("input__label--floating");
            });

            it("Should add 'floating' class to the label when input's value is defined.", () => {
                // given & when
                const { getByTestId } = renderComponent({ value: "value" });

                // then
                expect(getByTestId(`${testId}__label`)).toHaveClass("input__label--floating");
            });

            it("Should add 'focused' class to the label when input is focused.", () => {
                // given
                const { getByTestId } = renderComponent({ label: "label" });

                // when
                fireFocusEvent(getByTestId(testId));

                // then
                expect(getByTestId(`${testId}__label`)).toHaveClass("input__label--focused");
            });

            it("Should add '*' to the label if required flag is set.", () => {
                // given
                const label = "label";
                const required = true;

                // when
                const { getByTestId } = renderComponent({ label, required });

                // then
                expect(getByTestId(`${testId}__label`)).toHaveTextContent(`${label}*`);
            });

            it("Should render value in input.", () => {
                // given
                const value = "value";

                // when
                const { getByTestId } = renderComponent({ value });

                // then
                expect(getByTestId(testId)).toHaveValue(value);
            });

            it("Should have 'password' when provided type is 'password' and password lookup is not active.", () => {
                // given
                const type = "password";

                // when
                const { getByTestId } = renderComponent({ type });

                // then
                expect(getByTestId(testId)).toHaveAttribute("type", type);
            });

            it("Should render password lookup button when provided type is 'password' and withPasswordLookup flag is set.", () => {
                // given
                const type = "password";
                const withPasswordLookup = true;

                // when
                const { getByTestId } = renderComponent({ type, withPasswordLookup });

                // then
                expect(getByTestId(`${testId}__password-lookup`)).toBeInTheDocument();
            });

            it("Should have 'text' type when provided type is 'password' and password lookup button gets clicked.", () => {
                // given
                const type = "password";
                const withPasswordLookup = true;
                const { getByTestId } = renderComponent({ type, withPasswordLookup });

                // when
                fireClickEvent(getByTestId(`${testId}__password-lookup`));

                // then
                expect(getByTestId(testId)).toHaveAttribute("type", "text");
            });

            it("Should render error message.", () => {
                // given
                const error = "error";

                // when
                const { getByTestId } = renderComponent({ error });

                // then
                expect(getByTestId(`${testId}__error-message`)).toHaveTextContent(error);
            });

            it("Should render helper message.", () => {
                // given
                const helperMessage = "helper";

                // when
                const { getByTestId } = renderComponent({ helperMessage });

                // then
                expect(getByTestId(`${testId}__helper-message`)).toHaveTextContent(helperMessage);
            });

            it("Should render required message when required flag is set.", () => {
                // given
                const required = true;

                // when
                const { getByTestId } = renderComponent({ required });

                // then
                expect(getByTestId(`${testId}__required-message`)).toBeInTheDocument();
            });

            it("Should render message placeholder when error and helperMessage are not defined and required flag is not set.", () => {
                // given & when
                const { getByTestId } = renderComponent();

                // then
                expect(getByTestId(`${testId}__message-placeholder`)).toBeInTheDocument();
            });

            it("Should fire onChange callback when text gets typed into the input.", () => {
                // given
                const value = "text";
                const onChange = jest.fn();
                const { getByTestId } = renderComponent({ onChange });

                // when
                fireChangeEvent(getByTestId(testId), value);

                // then
                expect(onChange).toHaveBeenCalledWith(value);
            });

            it("Should fire onBlur callback input gets blurred.", () => {
                // given
                const onBlur = jest.fn();
                const { getByTestId } = renderComponent({ onBlur });

                // when
                fireBlurEvent(getByTestId(testId));

                // then
                expect(onBlur).toHaveBeenCalled();
            });
        });
    });
});
