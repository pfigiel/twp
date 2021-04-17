import { range } from "features/common/utils";
import React, { Fragment } from "react";
import styles from "./styles.module.scss";

interface Props {
    lineLength?: number;
    lineCount?: number;
    lineLengthVariation?: number;
}

const LoadingTextPlaceholder = ({ lineLength = 10, lineCount = 1, lineLengthVariation = 0 }: Props) => (
    <div className={styles["loading-text-placeholder"]}>
        {range(lineCount).map((_, index) => (
            <div key={index}>
                {range(Math.random() * lineLengthVariation + lineLength).map((_, index) => (
                    <Fragment key={index}>&#x2587;</Fragment>
                ))}
            </div>
        ))}
    </div>
);

export default LoadingTextPlaceholder;
