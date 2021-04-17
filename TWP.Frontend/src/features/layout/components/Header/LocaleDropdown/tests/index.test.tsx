import { render } from "@testing-library/react";
import { defaultLocale } from "features/common/constants";
import { Locale } from "features/common/types";
import { setLocaleInStorage } from "features/layout/utils";
import { fireClickEvent } from "tests/utils";
import { mocked } from "ts-jest/utils";
import LocaleDropdown, { Props } from "../component";

jest.mock("features/layout/utils", () => ({
    ...(jest.requireActual("features/layout/utils") as object),
    getLocaleFromStorage: jest.fn(),
    setLocaleInStorage: jest.fn(),
}));

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

                it("Should set locale in storage and fire setLocale callback when locale gets selected.", () => {
                    // given
                    const selectedLocale: Locale = "pl";
                    const setLocale = jest.fn();
                    const setLocaleInStorageMock = jest.fn();
                    mocked(setLocaleInStorage).mockImplementation(setLocaleInStorageMock);
                    const { getByTestId, getByText } = renderComponent({ setLocale });
                    fireClickEvent(getByTestId(`${testId}__toggle`));

                    // when
                    fireClickEvent(getByText(selectedLocale.toUpperCase()));

                    // then
                    expect(setLocale).toHaveBeenCalledWith(selectedLocale);
                    expect(setLocaleInStorageMock).toHaveBeenCalledWith(selectedLocale);
                });
            });
        });
    });
});
