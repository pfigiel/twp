import { render } from "@testing-library/react";
import { defaultLocale } from "features/common/constants";
import { Locale } from "features/common/types";
import { fireClickEvent } from "tests/utils";
import LocaleDropdown, { Props } from "../component";

describe("layout", () => {
    describe("components", () => {
        describe("Header", () => {
            describe("LanguageDropdown", () => {
                const testId = "locale-dropdown";

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

                it("Should fire setLocale when locale gets selected.", () => {
                    // given
                    const selectedLocale: Locale = "pl";
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
