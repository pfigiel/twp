import { resetSignUpState } from "features/user/actions";
import {
    selectIsEmailAvailable,
    selectIsUsernameAvailable,
    selectSignUpError,
    selectSignUpLoading,
    selectSignUpSuccess,
} from "features/user/selectors";
import { checkEmailAvailabilityAsync, checkUsernameAvailabilityAsync, signUpAsync } from "features/user/thunks";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "store";
import SignUp from "./component";

const mapStateToProps = (state: RootState) => ({
    signUpLoading: selectSignUpLoading(state),
    signUpSuccess: selectSignUpSuccess(state),
    signUpError: selectSignUpError(state),
    isEmailAvailable: selectIsEmailAvailable(state),
    isUsernameAvailable: selectIsUsernameAvailable(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            signUpAsync,
            checkEmailAvailabilityAsync,
            checkUsernameAvailabilityAsync,
            resetSignUpState: () => resetSignUpState(),
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
