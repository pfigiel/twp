import classNames from "classnames";
import config from "config";
import { useCurrentRoute } from "features/routing/hooks";
import { ReactElement } from "react";
import styles from "./styles.module.scss";

export interface Props {
    ["data-testid"]?: string;
    children: ReactElement;
}

const Content = ({ "data-testid": testId = "content", children }: Props) => {
    const currentRoute = useCurrentRoute();

    return (
        <div className={styles["content"]}>
            <div
                data-testid={`${testId}__middle-section`}
                className={classNames(styles["content__middle-section"], {
                    [styles["content__middle-section--no-mobile-shadow"]]: currentRoute === config.appRoutes.dashboard,
                })}>
                {children}
            </div>
        </div>
    );
};

export default Content;
