import { renderHook } from "@testing-library/react-hooks";
import { fireWindowResizeEvent } from "tests/utils";
import { useOnResizeListener } from "..";

describe("common", () => {
    describe("hooks", () => {
        describe("useOnResizeListener", () => {
            it("Should fire callback when resize event gets fired.", () => {
                // given
                const callback = jest.fn();
                renderHook(() => useOnResizeListener(callback));

                // when
                fireWindowResizeEvent();

                // then
                expect(callback).toHaveBeenCalled();
            });

            it("Should remove event listener on unmount.", () => {
                // given
                const removeEventListener = jest.fn();
                jest.spyOn(window, "removeEventListener").mockImplementation(removeEventListener);
                const { unmount } = renderHook(() => useOnResizeListener(jest.fn()));

                // when
                unmount();

                // then
                expect(removeEventListener).toHaveBeenCalled();
            });
        });
    });
});
