import { setLocale } from "features/common/actions";
import { selectLocale } from "features/common/selectors";
import { Locale } from "features/common/types";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { bindActionCreators } from "redux";
import { RootState } from "store";
import LocaleDropdown from "./component";

const mapStateToProps = (state: RootState) => ({
    locale: selectLocale(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({ setLocale: (locale: Locale) => setLocale(locale) }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LocaleDropdown);
