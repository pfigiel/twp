import config from "config";
import Tile from "features/common/components/Tile";
import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss";

export interface Props {
    ["data-testid"]?: string;
}

const Dashboard = ({ "data-testid": testId = "dashboard" }) => {
    const history = useHistory();

    return (
        <div className={styles["dashboard"]}>
            <Tile
                data-testid={`${testId}__songs-tile`}
                className={styles["dashboard__tile"]}
                clickable
                onClick={() => history.push(config.appRoutes.songs)}>
                <h1>Lorem ipsum</h1>
            </Tile>
            <Tile className={styles["dashboard__tile"]} clickable onClick={() => {}}>
                <h1>Lorem ipsum</h1>
            </Tile>
            <Tile className={styles["dashboard__tile"]} clickable onClick={() => {}}>
                <h1>Lorem ipsum</h1>
            </Tile>
            <Tile className={styles["dashboard__tile"]} clickable onClick={() => {}}>
                <h1>Lorem ipsum</h1>
            </Tile>
        </div>
    );
};

export default Dashboard;
