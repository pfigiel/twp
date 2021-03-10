import { selectLocale } from "features/common/selectors";
import { connect } from "react-redux";
import { RootState } from "store";
import App from "./component";

const mapStateToProps = (state: RootState) => ({ locale: selectLocale(state) });

export default connect(mapStateToProps)(App);
