import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCreateCancelToken } from "api/hooks";
import { ApiError } from "api/types";
import { CancelToken } from "axios";
import DataTable, { TableColumn } from "features/common/components/DataTable";
import { getTranslatedMessage } from "features/common/translations";
import LayoutHeaderTile from "features/layout/components/LayoutHeaderTile";
import LayoutTile from "features/layout/components/LayoutTile";
import { useErrorNotification, useGlobalLoader } from "features/layout/hooks";
import { appRoutes } from "features/routing/constants/routes";
import messages from "features/songs/translations";
import { Song } from "features/songs/types";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router";

const columns: TableColumn<Song>[] = [
    {
        key: "id",
        hidden: true,
    },
    {
        key: "title",
        label: "Title",
    },
    {
        key: "artist",
        label: "Artist",
    },
];

interface Props {
    songs?: Song[];
    songsLoading: boolean;
    songsLoadingError?: ApiError;
    getSongsAsync: (cancelToken: CancelToken) => void;
}

const SongsList = ({ songs, songsLoading, songsLoadingError, getSongsAsync }: Props) => {
    const intl = useIntl();
    const history = useHistory();
    const createCancelToken = useCreateCancelToken();

    useGlobalLoader(songsLoading);
    useErrorNotification(getTranslatedMessage(messages.songsList.songsFetchError, intl), !!songsLoadingError);

    useEffect(() => {
        if (songs === undefined && !songsLoading && !songsLoadingError) {
            getSongsAsync(createCancelToken());
        }
    }, [createCancelToken, getSongsAsync, songs, songsLoading, songsLoadingError]);

    return (
        <div>
            <LayoutHeaderTile title={getTranslatedMessage(messages.songsList.songs, intl)} />
            <LayoutTile>
                <DataTable
                    data={songs ?? []}
                    columns={columns}
                    idColumn="id"
                    actions={[
                        {
                            icon: <FontAwesomeIcon icon={faEye} />,
                            onClick: (id: number) => history.push(`${appRoutes.songs}/${id}`),
                        },
                    ]}
                />
            </LayoutTile>
        </div>
    );
};

export default SongsList;
