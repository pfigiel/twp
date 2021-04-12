import each from "jest-each";
import { createBemGenerator, mapObjectToQueryParameters, numberToPixels } from "..";

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

        describe("createBemGenerator", () => {
            each([
                ["block", "block", undefined, undefined],
                ["block__element", "block", "element", undefined],
                ["block__element--modifier", "block", "element", "modifier"],
                ["block--modifier", "block", undefined, "modifier"],
            ]).it(
                "Should compose class name %p from block %p, element %p and modifier %p.",
                (className: string, block: string, element?: string, modifier?: string) => {
                    // given
                    const bem = createBemGenerator(block);

                    // when
                    const result = bem(element, modifier);

                    // then
                    expect(result).toBe(className);
                }
            );
        });

        describe("mapObjectToQueryParameters", () => {
            it("Should return empty string if object is empty.", () => {
                // given
                const object = {};

                // when
                const result = mapObjectToQueryParameters(object);

                // then
                expect(result).toBe("");
            });

            it("Should map objects to query search string.", () => {
                // given
                const object = {
                    propOne: "test",
                    propTwo: 8,
                    propThree: true,
                };

                // when
                const result = mapObjectToQueryParameters(object);

                // then
                expect(result).toBe(
                    `?propOne=${object.propOne}&propTwo=${object.propTwo}&propThree=${object.propThree}`
                );
            });
        });
    });
});
