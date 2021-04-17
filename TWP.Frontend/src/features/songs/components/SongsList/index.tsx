import { selectSongs, selectSongsLoading, selectSongsLoadingError } from "features/songs/selectors";
import { getSongsAsync } from "features/songs/thunks";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "store";
import SongsList from "./component";

const mapStateToProps = (state: RootState) => ({
    songs: selectSongs(state),
    songsLoading: selectSongsLoading(state),
    songsLoadingError: selectSongsLoadingError(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ getSongsAsync }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
