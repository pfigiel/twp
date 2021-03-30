import { selectVerifyTokenLoading } from "features/user/selectors";
import { verifyTokenAsync } from "features/user/thunks";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "store";
import AuthenticationGateway from "./component";

const mapStateToProps = (state: RootState) => ({
    verifyTokenLoading: selectVerifyTokenLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ verifyTokenAsync }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationGateway);
