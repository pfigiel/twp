import { renderHook } from "@testing-library/react-hooks";
import { fireHookWindowResizeEvent, overrideImmutableProperty } from "tests/utils";
import { useViewportSize } from "..";

describe("common", () => {
    describe("hooks", () => {
        describe("useViewportSize", () => {
            it("Should initially return current viewport size.", () => {
                // given
                const width = 200;
                const height = 100;
                overrideImmutableProperty(window, "innerWidth", width);
                overrideImmutableProperty(window, "innerHeight", height);

                // when
                const { result } = renderHook(() => useViewportSize());

                // then
                expect(result.current.width).toBe(width);
                expect(result.current.height).toBe(height);
            });

            it("Should return updated viewport size when resize event gets fired.", () => {
                // given
                const oldWidth = 200;
                const oldHeight = 100;
                const newWidth = 400;
                const newHeight = 300;

                overrideImmutableProperty(window, "innerWidth", oldWidth);
                overrideImmutableProperty(window, "innerHeight", oldHeight);

                const { result, rerender } = renderHook(() => useViewportSize());

                // when
                overrideImmutableProperty(window, "innerWidth", newWidth);
                overrideImmutableProperty(window, "innerHeight", newHeight);
                fireHookWindowResizeEvent();
                rerender();

                // then
                expect(result.current.width).toBe(newWidth);
                expect(result.current.height).toBe(newHeight);
            });

            it("Should remove event listener on unmount.", () => {
                // given
                const removeEventListener = jest.fn();
                jest.spyOn(window, "removeEventListener").mockImplementation(removeEventListener);
                const { unmount } = renderHook(() => useViewportSize());

                // when
                unmount();

                // then
                expect(removeEventListener).toHaveBeenCalled();
            });
        });
    });
});
