import baseApi from "api";
import { apiRoutes } from "api/constants";
import { CancelToken } from "axios";
import { GetSongResponseDto, GetSongsResponseDto } from "features/songs/types";

export interface SongsApi {
    getSongAsync: (id: number, cancelToken: CancelToken) => Promise<GetSongResponseDto>;
    getSongsAsync: (cancelToken: CancelToken) => Promise<GetSongsResponseDto>;
}

const songsApi: SongsApi = {
    getSongAsync: (id: number, cancelToken: CancelToken) =>
        baseApi.get<GetSongResponseDto>(`${apiRoutes.songs.getSongs}/${id}`, cancelToken),
    getSongsAsync: (cancelToken: CancelToken) =>
        baseApi.get<GetSongsResponseDto>(apiRoutes.songs.getSongs, cancelToken),
};

export default songsApi;
