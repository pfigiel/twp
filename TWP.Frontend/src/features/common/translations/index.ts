import { IntlShape } from "react-intl";

export const getTranslatedMessage = (id: string, intl: IntlShape) => intl.formatMessage({ id });
