import { selectLoaderVisible } from "features/layout/selectors";
import { connect } from "react-redux";
import { RootState } from "store";
import LoaderSection from "./component";

const mapStateToProps = (state: RootState) => ({
    isLoaderVisible: selectLoaderVisible(state),
});

export default connect(mapStateToProps)(LoaderSection);
