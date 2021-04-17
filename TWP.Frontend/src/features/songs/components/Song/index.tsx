import { selectSong, selectSongLoading, selectSongLoadingError } from "features/songs/selectors";
import { getSongAsync } from "features/songs/thunks";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "store";
import Song from "./component";

const mapStateToProps = (state: RootState) => ({
    song: selectSong(state),
    songLoading: selectSongLoading(state),
    songLoadingError: selectSongLoadingError(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            getSongAsync,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Song);
