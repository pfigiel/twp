import { selectUser } from "features/user/selectors";
import { connect } from "react-redux";
import { RootState } from "store";
import UserSection from "./component";

const mapStateToProps = (state: RootState) => ({
    username: selectUser(state)?.username,
});

export default connect(mapStateToProps)(UserSection);
