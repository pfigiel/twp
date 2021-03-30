import { resetSignInState } from "features/user/actions";
import { selectSignInError, selectSignInLoading, selectSignInSuccess } from "features/user/selectors";
import { signInAsync } from "features/user/thunks";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "store";
import SignIn from "./component";

const mapStateToProps = (state: RootState) => ({
    signInLoading: selectSignInLoading(state),
    signInSuccess: selectSignInSuccess(state),
    signInError: selectSignInError(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({ signInAsync, resetSignInState: () => resetSignInState() }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
