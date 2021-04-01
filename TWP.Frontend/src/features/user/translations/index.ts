import commonMessages from "features/common/translations";

const messages = {
    common: {
        password: "user__password",
    },
    signIn: {
        error: "sign-in__error",
        noAccountQuestion: "sign-in__no-account-question",
        registerNow: "sign-in__register-now",
        signIn: commonMessages.signIn,
        usernameOrEmail: "sign-in__username-or-email",
    },
    signUp: {
        alreadyHaveAccountQuestion: "sign-up__already-have-account-question",
        confirmPassword: "sign-up__confirm-password",
        email: "sign-up__email",
        emailFormatError: "sign-up__email-format-error",
        emailTakenError: "sign-up__email-taken-error",
        passwordError: "sign-up__password-error",
        signIn: commonMessages.signIn,
        signUp: "sign-up__sign-up",
        signUpError: "sign-up__sign-up-error",
        signUpSuccess: "sign-up__sign-up-success",
        username: "sign-up__username",
        usernameFormatError: "sign-up__username-format-error",
        usernameTakenError: "sign-up__username-taken-error",
    },
};

export default messages;
