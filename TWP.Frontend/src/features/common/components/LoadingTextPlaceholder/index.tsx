import { range } from "features/common/utils";
import React, { Fragment } from "react";
import styles from "./styles.module.scss";

export interface Props {
    ["data-testid"]?: string;
    lineLength?: number;
    lineCount?: number;
    lineLengthVariation?: number;
}

const LoadingTextPlaceholder = ({
    "data-testid": testId = "loading-text-placeholder",
    lineLength = 10,
    lineCount = 1,
    lineLengthVariation = 0,
}: Props) => (
    <div data-testid={testId} className={styles["loading-text-placeholder"]}>
        {range(lineCount).map((_, index) => (
            <div data-testid={`${testId}__line`} key={index}>
                {range(Math.random() * lineLengthVariation + lineLength).map((_, index) => (
                    <Fragment key={index}>&#x2587;</Fragment>
                ))}
            </div>
        ))}
    </div>
);

export default LoadingTextPlaceholder;
