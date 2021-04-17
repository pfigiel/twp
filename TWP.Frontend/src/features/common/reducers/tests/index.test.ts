import { setLocale } from "features/common/actions";
import commonReducer, { CommonState } from "..";

describe("common", () => {
    describe("reducers", () => {
        const createState = (state: Partial<CommonState> = {}): CommonState => ({
            ...state,
            locale: state.locale ?? "pl",
        });

        describe("setLocale", () => {
            it("Should set locale to specified value.", () => {
                // given
                const locale = "en";
                const action = setLocale(locale);

                // when
                const state = commonReducer(createState({ locale: "pl" }), action);

                // then
                expect(state.locale).toBe(locale);
            });
        });
    });
});
