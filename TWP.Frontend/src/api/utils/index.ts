import { ApiError } from "api/types";
import { Dispatch } from "redux";
import { Action } from "store";
import { ActionType, PayloadActionCreator } from "typesafe-actions";

export const makeApiRequest = async <TArguments extends unknown[], TResponse>(
    method: (...args: TArguments) => Promise<TResponse>,
    apiArguments: TArguments,
    successAction: PayloadActionCreator<ActionType<Action>, TResponse>,
    failureAction: PayloadActionCreator<ActionType<Action>, ApiError>,
    dispatch: Dispatch
): Promise<void> => {
    try {
        const response = await method(...apiArguments);
        dispatch(successAction(response));
    } catch (error) {
        dispatch(failureAction(error));
    }
};
