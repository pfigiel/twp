import { makeApiRequest } from "api/utils";
import { CancelToken } from "axios";
import { getSong, getSongs, SongsAction } from "features/songs/actions";
import { SongsApi } from "features/songs/api";
import { ThunkAction } from "redux-thunk";
import { RootState } from "store";

export const getSongAsync = (
    id: number,
    cancelToken: CancelToken
): ThunkAction<void, RootState, Pick<SongsApi, "getSongAsync">, SongsAction> => {
    return async (dispatch, _, api) => {
        dispatch(getSong.request());

        return await makeApiRequest(api.getSongAsync, [id, cancelToken], getSong.success, getSong.failure, dispatch);
    };
};

export const getSongsAsync = (
    cancelToken: CancelToken
): ThunkAction<void, RootState, Pick<SongsApi, "getSongsAsync">, SongsAction> => {
    return async (dispatch, _, api) => {
        dispatch(getSongs.request());

        return await makeApiRequest(api.getSongsAsync, [cancelToken], getSongs.success, getSongs.failure, dispatch);
    };
};
