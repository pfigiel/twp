import { render } from "@testing-library/react";
import { Locale } from "features/common/types";
import { fireClickEvent } from "tests/utils";
import LocaleDropdown, { Props } from "../component";

describe("layout", () => {
    describe("components", () => {
        describe("Header", () => {
            describe("LanguageDropdown", () => {
                const testId = "locale-dropdown";
                const defaultLocale: Locale = "pl";

                const renderComponent = (props: Partial<Props> = {}) => {
                    const { locale = defaultLocale, setLocale = jest.fn() } = props;

                    return render(<LocaleDropdown locale={locale} setLocale={setLocale} />);
                };

                it("Should render selected locale in toggle.", () => {
                    // given & when
                    const { getByTestId } = renderComponent();

                    // then
                    expect(getByTestId(`${testId}__toggle`)).toHaveTextContent(defaultLocale.toUpperCase());
                });

                it("Should apply --rotated class modifier to toggle icon when dropdown is expanded.", () => {
                    // given
                    const { getByTestId } = renderComponent();

                    // when
                    fireClickEvent(getByTestId(`${testId}__toggle`));

                    // then
                    expect(getByTestId(`${testId}__toggle-icon`)).toHaveClass("locale-dropdown__toggle-icon--rotated");
                });

                it("Should fire setLocale when locale gets selected.", () => {
                    // given
                    const selectedLocale: Locale = "en";
                    const setLocale = jest.fn();
                    const { getByTestId, getByText } = renderComponent({ setLocale });
                    fireClickEvent(getByTestId(`${testId}__toggle`));

                    // when
                    fireClickEvent(getByText(selectedLocale.toUpperCase()));

                    // then
                    expect(setLocale).toHaveBeenCalledWith(selectedLocale);
                });
            });
        });
    });
});
