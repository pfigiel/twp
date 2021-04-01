import { removeLastNotification, removeNotification } from "features/layout/actions";
import { selectNotifications } from "features/layout/selectors";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "store";
import NotificationsSection from "./component";

const mapStateToProps = (state: RootState) => ({
    notifications: selectNotifications(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            removeNotification: (index: number) => removeNotification(index),
            removeLastNotification: () => removeLastNotification(),
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsSection);
