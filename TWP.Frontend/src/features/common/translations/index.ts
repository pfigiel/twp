import { IntlShape } from "react-intl";

export const getTranslatedMessage = (id: string, intl: IntlShape) => intl.formatMessage({ id });

const messages = {
    dashboard: "common__dashboard",
    fieldRequired: "common__field-required",
    collections: "common__collections",
    privacyPolicy: "common__privacy-policy",
    regulations: "common__regulations",
    signIn: "common__sign-in",
    editor: "common__editor",
    songs: "common__songs",
};

export default messages;
