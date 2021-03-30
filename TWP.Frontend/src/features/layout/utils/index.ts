import { Locale } from "features/common/types";
import { localeStorageItemName } from "features/layout/constants";

export const setLocaleInStorage = (locale: Locale) => localStorage.setItem(localeStorageItemName, locale);

export const getLocaleFromStorage = () => localStorage.getItem(localeStorageItemName);
