import { render } from "@testing-library/react";
import { appRoutes } from "features/routing/constants/routes";
import React from "react";
import { useHistory } from "react-router-dom";
import { fireClickEvent, withIntlProvider } from "tests/utils";
import { mocked } from "ts-jest/utils";
import Footer from "..";

jest.mock("react-router-dom", () => ({ ...(jest.requireActual("react-router-dom") as object), useHistory: jest.fn() }));

describe("layout", () => {
    describe("components", () => {
        describe("Footer", () => {
            const testId = "footer";

            const renderComponent = () => render(withIntlProvider(<Footer data-testid={testId} />));

            it("Should redirect to privacy policy page when link gets clicked.", () => {
                // given
                const push = jest.fn();
                mocked(useHistory).mockReturnValue({ push } as any);
                const { getByTestId } = renderComponent();

                // when
                fireClickEvent(getByTestId(`${testId}__privacy-policy-link`));

                // then
                expect(push).toHaveBeenCalledWith(appRoutes.privacyPolicy);
            });

            it("Should redirect to regulations page when link gets clicked.", () => {
                // given
                const push = jest.fn();
                mocked(useHistory).mockReturnValue({ push } as any);
                const { getByTestId } = renderComponent();

                // when
                fireClickEvent(getByTestId(`${testId}__regulations-link`));

                // then
                expect(push).toHaveBeenCalledWith(appRoutes.regulations);
            });
        });
    });
});
