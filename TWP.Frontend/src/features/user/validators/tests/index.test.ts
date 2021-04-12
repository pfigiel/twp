import each from "jest-each";
import { isEmailValid, isPasswordValid, isUsernameValid } from "..";

describe("user", () => {
    describe("validators", () => {
        describe("isEmailValid", () => {
            each([
                [false, undefined],
                [false, "invalid"],
                [false, "invalid@"],
                [false, "invalid@i"],
                [false, "invalid@i."],
                [false, "valid@v.v"],
            ]).it("Should return %p for email %p.", (expectedResult: boolean, email?: string) => {
                // given & when
                const result = isEmailValid(email);

                // then
                expect(result).toBe(expectedResult);
            });
        });

        describe("isUsernameValid", () => {
            each([
                [false, undefined],
                [false, ""],
                [false, "aaa"],
                [false, "aaaaaaaaaaaaaaaaaaaaa"],
                [true, "aaaa"],
                [true, "aaaaaaaaaaaaaaaaaaaa"],
            ]).it("Should return %p for username %p.", (expectedResult: boolean, username?: string) => {
                // given & when
                const result = isUsernameValid(username);

                // then
                expect(result).toBe(expectedResult);
            });
        });

        describe("isPasswordValid", () => {
            each([
                [false, undefined],
                [false, ""],
                [false, "aaaaaaa"],
                [false, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
                [true, "aaaaaaaa"],
                [true, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
            ]).it("Should return %p for password %p.", (expectedResult: boolean, password?: string) => {
                // given & when
                const result = isPasswordValid(password);

                // then
                expect(result).toBe(expectedResult);
            });
        });
    });
});
