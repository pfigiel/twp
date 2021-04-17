import { createSelector } from "reselect";
import { RootState } from "store";

const selectState = (state: RootState) => state.songs;

export const selectSong = createSelector(selectState, (state) => state.song);
export const selectSongLoading = createSelector(selectState, (state) => state.songLoading);
export const selectSongLoadingError = createSelector(selectState, (state) => state.songLoadingError);

export const selectSongs = createSelector(selectState, (state) => state.songs);
export const selectSongsLoading = createSelector(selectState, (state) => state.songsLoading);
export const selectSongsLoadingError = createSelector(selectState, (state) => state.songsLoadingError);
