import { ApiError } from "api/types";
import { GetSongResponseDto, GetSongsResponseDto } from "features/songs/types";
import { ActionType, createAsyncAction } from "typesafe-actions";

export const getSong = createAsyncAction("GET_SONG_REQUEST", "GET_SONG_SUCCESS", "GET_SONG_FAILURE")<
    void,
    GetSongResponseDto,
    ApiError
>();

export const getSongs = createAsyncAction("GET_SONGS_REQUEST", "GET_SONGS_SUCCESS", "GET_SONGS_FAILURE")<
    void,
    GetSongsResponseDto,
    ApiError
>();

export type SongsAction = ActionType<typeof getSong> | ActionType<typeof getSongs>;
