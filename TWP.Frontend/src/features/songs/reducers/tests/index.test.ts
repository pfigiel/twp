import { getSong, getSongs } from "features/songs/actions";
import { GetSongResponseDto, GetSongsResponseDto, Song, SongDetails } from "features/songs/types";
import { createApiError } from "tests/utils";
import songsReducer, { SongsState } from "..";

describe("songs", () => {
    describe("reducers", () => {
        const createSongs = (): Song[] => [{ id: 1, title: "Title", artist: "Artist" }];

        const createSongDetails = (): SongDetails => ({ id: 1, title: "Title", artist: "Artist", sections: [] });

        const createState = (state: Partial<SongsState> = {}): SongsState => ({
            ...state,
            songLoading: state.songLoading ?? false,
            songsLoading: state.songsLoading ?? false,
        });

        describe("getSong", () => {
            it("Should reset song, set loading flag and reset error on request action.", () => {
                // given
                const action = getSong.request();

                // when
                const state = songsReducer(
                    createState({ song: createSongDetails(), songLoadingError: createApiError() }),
                    action
                );

                // then
                expect(state.song).toBeUndefined();
                expect(state.songLoading).toBe(true);
                expect(state.songLoadingError).toBeUndefined();
            });

            it("Should set song, reset loading flag and reset error on request action.", () => {
                // given
                const songResponseDto: GetSongResponseDto = { song: createSongDetails() };
                const action = getSong.success(songResponseDto);

                // when
                const state = songsReducer(
                    createState({ songLoading: true, songLoadingError: createApiError() }),
                    action
                );

                // then
                expect(state.song).toBe(songResponseDto.song);
                expect(state.songLoading).toBe(false);
                expect(state.songLoadingError).toBeUndefined();
            });

            it("Should reset song, reset loading flag and set error on request action.", () => {
                // given
                const error = createApiError();
                const action = getSong.failure(error);

                // when
                const state = songsReducer(createState({ song: createSongDetails(), songLoading: true }), action);

                // then
                expect(state.song).toBeUndefined();
                expect(state.songLoading).toBe(false);
                expect(state.songLoadingError).toBe(error);
            });
        });

        describe("getSongs", () => {
            it("Should reset songs, set loading flag and reset error on request action.", () => {
                // given
                const action = getSongs.request();

                // when
                const state = songsReducer(
                    createState({ songs: createSongs(), songsLoadingError: createApiError() }),
                    action
                );

                // then
                expect(state.songs).toBeUndefined();
                expect(state.songsLoading).toBe(true);
                expect(state.songsLoadingError).toBeUndefined();
            });

            it("Should set songs, reset loading flag and reset error on request action.", () => {
                // given
                const songsResponseDto: GetSongsResponseDto = { songs: createSongs() };
                const action = getSongs.success(songsResponseDto);

                // when
                const state = songsReducer(
                    createState({ songsLoading: true, songsLoadingError: createApiError() }),
                    action
                );

                // then
                expect(state.songs).toBe(songsResponseDto.songs);
                expect(state.songsLoading).toBe(false);
                expect(state.songsLoadingError).toBeUndefined();
            });

            it("Should reset songs, reset loading flag and set error on request action.", () => {
                // given
                const error = createApiError();
                const action = getSongs.failure(error);

                // when
                const state = songsReducer(createState({ songs: createSongs(), songsLoading: true }), action);

                // then
                expect(state.songs).toBeUndefined();
                expect(state.songsLoading).toBe(false);
                expect(state.songsLoadingError).toBe(error);
            });
        });
    });
});
