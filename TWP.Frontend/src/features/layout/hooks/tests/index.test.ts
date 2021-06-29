import { renderHook } from "@testing-library/react-hooks";
import { pushNotification, setLoaderState } from "features/layout/actions";
import { useDispatch } from "react-redux";
import { mocked } from "ts-jest/utils";
import { useErrorNotification, useGlobalLoader, useSuccessNotification } from "..";

jest.mock("react-redux", () => ({ ...(jest.requireActual("react-redux") as object), useDispatch: jest.fn() }));

describe("layout", () => {
    describe("hooks", () => {
        describe("useGlobalLoader", () => {
            it("Should dispatch setLoaderState action on mount.", () => {
                // given
                const isLoading = false;
                const dispatch = jest.fn();
                mocked(useDispatch).mockReturnValue(dispatch);

                // when
                renderHook(() => useGlobalLoader(isLoading));

                // then
                expect(dispatch).toHaveBeenCalledWith(setLoaderState(isLoading));
            });

            it("Should dispatch setLoaderState on rerender.", () => {
                // given
                const newIsLoading = true;
                const dispatch = jest.fn();
                mocked(useDispatch).mockReturnValue(dispatch);
                const { rerender } = renderHook((isLoading: boolean) => useGlobalLoader(isLoading), {
                    initialProps: false,
                });

                // when
                rerender(newIsLoading);

                // then
                expect(dispatch).toHaveBeenLastCalledWith(setLoaderState(newIsLoading));
            });

            it("Should call setLoaderState with false argument on unmount.", () => {
                // given
                const dispatch = jest.fn();
                mocked(useDispatch).mockReturnValue(dispatch);
                const { unmount } = renderHook(() => useGlobalLoader(true));

                // when
                unmount();

                // then
                expect(dispatch).toHaveBeenLastCalledWith(setLoaderState(false));
            });
        });

        describe("useErrorNotification", () => {
            const message = "message";

            it("Should dispatch pushNotification when dispatchFlag changes from falsy to true.", () => {
                // given
                const dispatch = jest.fn();
                mocked(useDispatch).mockReturnValue(dispatch);
                const { rerender } = renderHook((props) => useErrorNotification(props.message, props.dispatchFlag), {
                    initialProps: { message, dispatchFlag: false },
                });

                // when
                rerender({ message, dispatchFlag: true });

                // then
                expect(dispatch).toHaveBeenCalledWith(pushNotification({ message, type: "error" }));
            });

            it("Should not dispatch pushNotification when dispatchFlag changes from true to falsy.", () => {
                // given
                const dispatch = jest.fn();
                mocked(useDispatch).mockReturnValue(dispatch);
                const { rerender } = renderHook((props) => useErrorNotification(props.message, props.dispatchFlag), {
                    initialProps: { message, dispatchFlag: true },
                });

                // when
                rerender({ message, dispatchFlag: false });

                // then
                expect(dispatch).not.toHaveBeenCalled();
            });
        });

        describe("useSuccessNotification", () => {
            const message = "message";

            it("Should dispatch pushNotification when dispatchFlag changes from falsy to true.", () => {
                // given
                const dispatch = jest.fn();
                mocked(useDispatch).mockReturnValue(dispatch);
                const { rerender } = renderHook((props) => useSuccessNotification(props.message, props.dispatchFlag), {
                    initialProps: { message, dispatchFlag: false },
                });

                // when
                rerender({ message, dispatchFlag: true });

                // then
                expect(dispatch).toHaveBeenCalledWith(pushNotification({ message, type: "success" }));
            });

            it("Should not dispatch pushNotification when dispatchFlag changes from true to falsy.", () => {
                // given
                const dispatch = jest.fn();
                mocked(useDispatch).mockReturnValue(dispatch);
                const { rerender } = renderHook((props) => useSuccessNotification(props.message, props.dispatchFlag), {
                    initialProps: { message, dispatchFlag: true },
                });

                // when
                rerender({ message, dispatchFlag: false });

                // then
                expect(dispatch).not.toHaveBeenCalled();
            });
        });
    });
});
