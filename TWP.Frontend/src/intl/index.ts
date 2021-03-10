import { Locale } from "features/common/types";
import en from "intl/en.json";
import pl from "intl/pl.json";

export const getMessages = (locale: Locale) => {
    switch (locale) {
        case "pl":
            return pl;
        default:
            return en;
    }
};
