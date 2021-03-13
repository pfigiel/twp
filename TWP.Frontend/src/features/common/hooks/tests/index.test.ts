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
        });
    });
});
