import classNames from "classnames";
import Loader from "features/common/components/Loader";
import { createBemGenerator } from "features/common/utils";
import styles from "./styles.module.scss";

export interface Props {
    isLoaderVisible: boolean;
}

const LoaderSection = ({ isLoaderVisible }: Props) => {
    const bem = createBemGenerator("loader-section");

    return (
        <div
            className={classNames(styles[bem("container")], {
                [styles[bem("container", "visible")]]: isLoaderVisible,
            })}>
            <div className={styles[bem("background")]}>
                <Loader className={styles[bem()]} />
            </div>
        </div>
    );
};

export default LoaderSection;
