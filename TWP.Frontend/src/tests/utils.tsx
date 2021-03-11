import { fireEvent } from "@testing-library/dom";
import { ReactElement } from "react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import store from "store";

export const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const withReduxProvider = (children: ReactElement) => <Provider store={store()}>{children}</Provider>;

export const actClick = (target: Document | Node | Element | Window) =>
    act(() => {
        fireEvent.click(target);
    });
