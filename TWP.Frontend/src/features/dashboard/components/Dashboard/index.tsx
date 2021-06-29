import Tile from "features/common/components/Tile";
import { getTranslatedMessage } from "features/common/translations";
import messages from "features/dashboard/translations";
import { appRoutes } from "features/routing/constants";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss";

export interface Props {
    ["data-testid"]?: string;
}

const Dashboard = ({ "data-testid": testId = "dashboard" }) => {
    const intl = useIntl();
    const history = useHistory();

    return (
        <div className={styles["dashboard"]}>
            <Tile
                data-testid={`${testId}__songs-tile`}
                className={styles["dashboard__tile"]}
                clickable
                onClick={() => history.push(appRoutes.songs)}>
                <h1>{getTranslatedMessage(messages.songs, intl)}</h1>
            </Tile>
            {/* // TODO: Implement onClick. */}
            <Tile className={styles["dashboard__tile"]} clickable onClick={() => {}}>
                <h1>{getTranslatedMessage(messages.collections, intl)}</h1>
            </Tile>
            {/* // TODO: Implement onClick. */}
            <Tile className={styles["dashboard__tile"]} clickable onClick={() => {}}>
                <h1>{getTranslatedMessage(messages.editor, intl)}</h1>
            </Tile>
            {/* // TODO: Implement onClick and add proper header text. */}
            <Tile className={styles["dashboard__tile"]} clickable onClick={() => {}}>
                <h1>Lorem ipsum</h1>
            </Tile>
        </div>
    );
};

export default Dashboard;
