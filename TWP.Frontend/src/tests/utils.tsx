import { fireEvent } from "@testing-library/dom";
import { ApiError } from "api/types";
import axios from "axios";
import { getMessages } from "intl";
import { ReactElement } from "react";
import { act } from "react-dom/test-utils";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { act as hookAct } from "react-test-renderer";
import store from "store";

export const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const withReduxProvider = (children: ReactElement) => <Provider store={store()}>{children}</Provider>;

export const withIntlProvider = (children: ReactElement) => (
    <IntlProvider locale="pl" messages={getMessages("pl")}>
        {children}
    </IntlProvider>
);

export const fireClickEvent = (target: Document | Node | Element | Window) =>
    act(() => {
        fireEvent.click(target);
    });

export const fireChangeEvent = (target: Document | Node | Element | Window, value: string) =>
    act(() => {
        fireEvent.change(target, { target: { value } });
    });

export const fireFocusEvent = (target: Document | Node | Element | Window) =>
    act(() => {
        fireEvent.focusIn(target);
    });

export const fireBlurEvent = (target: Document | Node | Element | Window) =>
    act(() => {
        fireEvent.focusOut(target);
    });

export const fireWindowResizeEvent = () =>
    act(() => {
        window.dispatchEvent(new Event("resize"));
    });

export const fireHookWindowResizeEvent = () =>
    hookAct(() => {
        window.dispatchEvent(new Event("resize"));
    });

export const createApiError = (): ApiError => (({} as unknown) as ApiError);

export const createCancelToken = () => axios.CancelToken.source().token;

export const overrideImmutableProperty = <TObject extends object>(
    object: TObject,
    property: string & keyof TObject,
    value: any
): TObject => Object.defineProperty(object, property, { value });
