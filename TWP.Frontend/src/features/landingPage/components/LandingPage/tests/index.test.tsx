import { render } from "@testing-library/react";
import config from "config";
import { useHistory } from "react-router-dom";
import { fireClickEvent, withIntlProvider } from "tests/utils";
import { mocked } from "ts-jest/utils";
import LandingPage, { Props } from "../component";

jest.mock("react-router-dom", () => ({ ...(jest.requireActual("react-router-dom") as any), useHistory: jest.fn() }));

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

            it("Should fire setLocale when locale button gets clicked.", () => {
                // given
                const clickedLocale = "en";
                const setLocale = jest.fn();
                const { getByTestId } = renderComponent({ setLocale });

                // when
                fireClickEvent(getByTestId(`${testId}__${clickedLocale}-locale-button`));

                // then
                expect(setLocale).toHaveBeenCalledWith(clickedLocale);
            });

            it("Should redirect to dashboard when go to dashboard button gets clicked.", () => {
                // given
                const push = jest.fn();
                mocked(useHistory).mockReturnValue({ ...useHistory(), push });
                const { getByTestId } = renderComponent();

                // when
                fireClickEvent(getByTestId(`${testId}__go-to-dashboard-button`));

                // then
                expect(push).toHaveBeenCalledWith(config.appRoutes.dashboard);
            });
        });
    });
});
