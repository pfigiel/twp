import { accessTokenStorageItemName, refreshTokenStorageItemName } from "features/user/constants";

export const setTokensInStorage = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(accessTokenStorageItemName, accessToken);
    localStorage.setItem(refreshTokenStorageItemName, refreshToken);
};

export const resetTokensInStorage = () => {
    localStorage.removeItem(accessTokenStorageItemName);
    localStorage.removeItem(refreshTokenStorageItemName);
};

export const getAccessTokenFromStorage = () => localStorage.getItem(accessTokenStorageItemName);

export const getRefreshTokenFromStorage = () => localStorage.getItem(refreshTokenStorageItemName);
