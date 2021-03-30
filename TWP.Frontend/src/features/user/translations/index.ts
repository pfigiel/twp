import commonMessages from "features/common/translations";

const messages = {
    common: {
        password: "user__password",
    },
    signIn: {
        noAccountQuestion: "sign-in__no-account-question",
        registerNow: "sign-in__register-now",
        signIn: commonMessages.signIn,
        usernameOrEmail: "sign-in__username-or-email",
    },
    signUp: {
        confirmPassword: "sign-up__confirm-password",
        email: "sign-up__email",
        emailFormatError: "sign-up__email-format-error",
        emailTakenError: "sign-up__email-taken-error",
        alreadyHaveAccountQuestion: "sign-up__already-have-account-question",

        passwordError: "sign-up__password-error",
        signIn: commonMessages.signIn,
        signUp: "sign-up__sign-up",
        username: "sign-up__username",
        usernameFormatError: "sign-up__username-format-error",
        usernameTakenError: "sign-up__username-taken-error",
    },
};

export default messages;
