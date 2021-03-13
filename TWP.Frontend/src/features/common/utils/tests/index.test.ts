import { numberToPixels } from "..";

describe("common", () => {
    describe("utils", () => {
        describe("numberToPixels", () => {
            it("Should convert number to pixels string.", () => {
                // given
                const pixels = 88;

                // when
                const result = numberToPixels(pixels);

                // then
                expect(result).toBe(`${pixels}px`);
            });
        });
    });
});
