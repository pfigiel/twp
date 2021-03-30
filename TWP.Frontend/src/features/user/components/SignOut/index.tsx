import { resetSignOutState } from "features/user/actions";
import { selectSignOutError, selectSignOutFinished, selectSignOutLoading } from "features/user/selectors";
import { signOutAsync } from "features/user/thunks";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "store";
import SignOut from "./component";

const mapStateToProps = (state: RootState) => ({
    signOutLoading: selectSignOutLoading(state),
    signOutFinished: selectSignOutFinished(state),
    signOutError: selectSignOutError(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            signOutAsync,
            resetSignOutState,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
