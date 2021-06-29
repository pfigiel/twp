import { ApiError } from "api/types";
import { getSong, getSongs, SongsAction } from "features/songs/actions";
import { Song, SongDetails } from "features/songs/types";
import produce from "immer";
import { getType } from "typesafe-actions";

export interface SongsState {
    song?: SongDetails;
    songLoading: boolean;
    songLoadingError?: ApiError;
    songs?: Song[];
    songsLoading: boolean;
    songsLoadingError?: ApiError;
}

const songsReducer = (
    state: SongsState = {
        songLoading: false,
        songsLoading: false,
    },
    action: SongsAction
): SongsState =>
    produce(state, (draft) => {
        switch (action.type) {
            case getType(getSong.request):
                draft.song = undefined;
                draft.songLoading = true;
                draft.songLoadingError = undefined;
                break;
            case getType(getSong.success):
                draft.song = action.payload.song;
                draft.songLoading = false;
                draft.songLoadingError = undefined;
                break;
            case getType(getSong.failure):
                draft.song = undefined;
                draft.songLoading = false;
                draft.songLoadingError = action.payload;
                break;
            case getType(getSongs.request):
                draft.songs = undefined;
                draft.songsLoading = true;
                draft.songsLoadingError = undefined;
                break;
            case getType(getSongs.success):
                draft.songs = action.payload.songs;
                draft.songsLoading = false;
                draft.songsLoadingError = undefined;
                break;
            case getType(getSongs.failure):
                draft.songs = undefined;
                draft.songsLoading = false;
                draft.songsLoadingError = action.payload;
                break;
        }
    });

export default songsReducer;
