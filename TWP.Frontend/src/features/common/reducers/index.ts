import { CommonAction, setLocale } from "features/common/actions";
import { defaultLocale } from "features/common/constants";
import { Locale } from "features/common/types";
import produce from "immer";
import { getType } from "typesafe-actions";

export interface CommonState {
    locale: Locale;
}

const commonReducer = (state: CommonState = { locale: defaultLocale }, action: CommonAction): CommonState =>
    produce(state, (draft) => {
        switch (action.type) {
            case getType(setLocale):
                draft.locale = action.payload;
                break;
        }
    });

export default commonReducer;
