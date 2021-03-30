export const isEmailValid = (email: string = "") =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );

export const isUsernameValid = (username: string = "") => username.length >= 4 && username.length <= 20;

export const isPasswordValid = (password: string = "") => password.length >= 8 && password.length <= 32;
