import { Locale } from "features/common/types";
import { ActionType, createAction } from "typesafe-actions";

export const setLocale = createAction("SET_LOCALE")<Locale>();

export type CommonAction = ActionType<typeof setLocale>;
