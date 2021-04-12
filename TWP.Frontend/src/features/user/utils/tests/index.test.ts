import { accessTokenStorageItemName, refreshTokenStorageItemName } from "features/user/constants";
import { overrideImmutableProperty } from "tests/utils";
import { getAccessTokenFromStorage, getRefreshTokenFromStorage, resetTokensInStorage, setTokensInStorage } from "..";

describe("user", () => {
    describe("utils", () => {
        const getItem = jest.fn();
        const setItem = jest.fn();
        const removeItem = jest.fn();
        overrideImmutableProperty(window, "localStorage", { getItem, setItem, removeItem });

        beforeEach(() => jest.resetAllMocks());

        describe("setTokensInStorage", () => {
            it("Should set tokens in local storage.", () => {
                // given
                const accessToken = "access-token";
                const refreshToken = "refresh-token";

                // when
                setTokensInStorage(accessToken, refreshToken);

                // then
                expect(setItem).toHaveBeenNthCalledWith(1, accessTokenStorageItemName, accessToken);
                expect(setItem).toHaveBeenNthCalledWith(2, refreshTokenStorageItemName, refreshToken);
            });
        });

        describe("resetTokensInStorage", () => {
            it("Should reset tokens in local storage.", () => {
                // given & when
                resetTokensInStorage();

                // then
                expect(removeItem).toHaveBeenNthCalledWith(1, accessTokenStorageItemName);
                expect(removeItem).toHaveBeenNthCalledWith(2, refreshTokenStorageItemName);
            });
        });

        describe("getAccessTokenFromStorage", () => {
            it("Should return access token from storage.", () => {
                // given
                const accessToken = "access-token";
                getItem.mockReturnValue(accessToken);

                // when
                const result = getAccessTokenFromStorage();

                // then
                expect(result).toBe(accessToken);
                expect(getItem).toHaveBeenCalledWith(accessTokenStorageItemName);
            });
        });

        describe("getRefreshTokenFromStorage", () => {
            it("Should return refresh token from storage.", () => {
                // given
                const refreshToken = "refresh-token";
                getItem.mockReturnValue(refreshToken);

                // when
                const result = getRefreshTokenFromStorage();

                // then
                expect(result).toBe(refreshToken);
                expect(getItem).toHaveBeenCalledWith(refreshTokenStorageItemName);
            });
        });
    });
});
