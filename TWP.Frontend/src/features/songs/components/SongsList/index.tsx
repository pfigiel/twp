import DataTable, { TableColumn } from "features/common/components/DataTable";
import { getTranslatedMessage } from "features/common/translations";
import { range } from "features/common/utils";
import LayoutHeaderTile from "features/layout/components/LayoutHeaderTile";
import LayoutTile from "features/layout/components/LayoutTile";
import messages from "features/songs/translations";
import React from "react";
import { useIntl } from "react-intl";

interface ListSong {
    id: number;
    title: string;
    artist: string;
}

const data: ListSong[] = range(100).map((index) => ({
    id: index,
    title: `Song ${index}`,
    artist: "Artist",
}));

const columns: TableColumn<ListSong>[] = [
    {
        key: "id",
        label: "Id",
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

const SongsList = () => {
    const intl = useIntl();

    return (
        <div>
            <LayoutHeaderTile title={getTranslatedMessage(messages.songsList.songs, intl)} />
            <LayoutTile>
                <DataTable data={data} columns={columns} idColumn="id" />
            </LayoutTile>
        </div>
    );
};

export default SongsList;
