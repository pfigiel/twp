import { useCreateCancelToken } from "api/hooks";
import { ApiError } from "api/types";
import { CancelToken } from "axios";
import LoadingTextPlaceholder from "features/common/components/LoadingTextPlaceholder";
import { getTranslatedMessage } from "features/common/translations";
import { createBemGenerator } from "features/common/utils";
import LayoutHeaderTile from "features/layout/components/LayoutHeaderTile";
import LayoutTile from "features/layout/components/LayoutTile";
import { useErrorNotification, useGlobalLoader } from "features/layout/hooks";
import messages from "features/songs/translations";
import { SongDetails } from "features/songs/types";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import styles from "./styles.module.scss";

interface Props {
    songId: number;
    song?: SongDetails;
    songLoading: boolean;
    songLoadingError?: ApiError;
    getSongAsync: (id: number, cancelToken: CancelToken) => void;
}

const Song = ({ songId, song, songLoading, songLoadingError, getSongAsync }: Props) => {
    const intl = useIntl();
    const bem = createBemGenerator("song");
    const createCancelToken = useCreateCancelToken();

    useGlobalLoader(songLoading);
    useErrorNotification(getTranslatedMessage(messages.songsList.songFetchError, intl), !!songLoadingError);

    useEffect(() => {
        if (!song && !songLoading && !songLoadingError) {
            getSongAsync(songId, createCancelToken());
        }
    });

    return (
        <div>
            <LayoutHeaderTile title={song?.title ?? ""} isLoading={songLoading} />
            <LayoutTile>
                <>
                    {songLoading ? (
                        <LoadingTextPlaceholder lineCount={10} lineLength={20} lineLengthVariation={5} />
                    ) : (
                        song?.sections.map((section, index) => (
                            <div key={index} className={styles[bem("section")]}>
                                {section.fragments.map((fragment) =>
                                    fragment.text.split("\\n").map((line) => <div key={line}>{line}</div>)
                                )}
                            </div>
                        ))
                    )}
                </>
            </LayoutTile>
        </div>
    );
};

export default Song;
