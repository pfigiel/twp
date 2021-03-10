import { setLocale } from "features/common/actions";
import { selectLocale } from "features/common/selectors";
import { Locale } from "features/common/types";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "store";
import LandingPage from "./component";

const mapStateToProps = (state: RootState) => ({ locale: selectLocale(state) });

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({ setLocale: (locale: Locale) => setLocale(locale) }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
