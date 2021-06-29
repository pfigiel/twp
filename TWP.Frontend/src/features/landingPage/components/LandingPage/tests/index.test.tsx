import { render } from "@testing-library/react";
import { Locale } from "features/common/types";
import { appRoutes } from "features/routing/constants";
import each from "jest-each";
import { useHistory } from "react-router-dom";
import { fireClickEvent, withIntlProvider } from "tests/utils";
import { mocked } from "ts-jest/utils";
import LandingPage, { Props } from "../component";

jest.mock("react-router-dom", () => ({ ...(jest.requireActual("react-router-dom") as object), useHistory: jest.fn() }));

describe("landingPage", () => {
    describe("components", () => {
        describe("LandingPage", () => {
            const testId = "landing-page";

            const renderComponent = (props: Partial<Props> = {}) => {
                const { locale = "pl", setLocale = jest.fn() } = props;

                return render(withIntlProvider(<LandingPage locale={locale} setLocale={setLocale} />));
            };

            it("Should selected locale button have --active modifier.", () => {
                // given & when
                const { getByTestId } = renderComponent();

                // then
                expect(getByTestId(`${testId}__pl-locale-button`)).toHaveClass(
                    "landing-page__header-tile-language-link--active"
                );
            });

            each([
                ["pl", "en"],
                ["en", "pl"],
            ]).it(
                "Should fire setLocale when %p locale button gets clicked.",
                (newLocale: Locale, initialLocale: Locale) => {
                    // given
                    const setLocale = jest.fn();
                    const { getByTestId } = renderComponent({ locale: initialLocale, setLocale });

                    // when
                    fireClickEvent(getByTestId(`${testId}__${newLocale}-locale-button`));

                    // then
                    expect(setLocale).toHaveBeenCalledWith(newLocale);
                }
            );

            it("Should redirect to dashboard when go to dashboard button gets clicked.", () => {
                // given
                const push = jest.fn();
                mocked(useHistory).mockReturnValue({ push } as any);
                const { getByTestId } = renderComponent();

                // when
                fireClickEvent(getByTestId(`${testId}__go-to-dashboard-button`));

                // then
                expect(push).toHaveBeenCalledWith(appRoutes.dashboard);
            });
        });
    });
});
