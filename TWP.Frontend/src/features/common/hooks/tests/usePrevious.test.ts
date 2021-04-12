import { renderHook } from "@testing-library/react-hooks";
import { usePrevious } from "..";

describe("common", () => {
    describe("hooks", () => {
        describe("usePrevious", () => {
            it("Should initially return initialValue when provided.", () => {
                // given
                const value = "value";
                const initialValue = "initial-value";

                // when
                const { result } = renderHook(() => usePrevious(value, initialValue));

                // then
                expect(result.current).toBe(initialValue);
            });

            it("Should return previous value.", async () => {
                // given
                const oldValue = "old-value";
                const newValue = "new-value";
                const { result, rerender } = renderHook((oldValue) => usePrevious(oldValue), {
                    initialProps: oldValue,
                });

                // when & then
                rerender(newValue);
                expect(result.current).toBe(oldValue);

                rerender(newValue);
                expect(result.current).toBe(newValue);
            });
        });
    });
});
