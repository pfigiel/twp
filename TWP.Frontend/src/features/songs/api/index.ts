import baseApi from "api";
import { CancelToken } from "axios";
import config from "config";
import { GetSongResponseDto, GetSongsResponseDto } from "features/songs/types";

export interface SongsApi {
    getSongAsync: (id: number, cancelToken: CancelToken) => Promise<GetSongResponseDto>;
    getSongsAsync: (cancelToken: CancelToken) => Promise<GetSongsResponseDto>;
}

const songsApi: SongsApi = {
    getSongAsync: (id: number, cancelToken: CancelToken) =>
        baseApi.get<GetSongResponseDto>(`${config.apiRoutes.songs.getSongs}/${id}`, cancelToken),
    getSongsAsync: (cancelToken: CancelToken) =>
        baseApi.get<GetSongsResponseDto>(config.apiRoutes.songs.getSongs, cancelToken),
};

export default songsApi;
