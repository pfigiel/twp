import SongComponent from "features/songs/components/Song";
import { useParams } from "react-router";

interface Params {
    id: string;
}

const Song = () => {
    const { id } = useParams<Params>();

    return <SongComponent songId={parseInt(id)} />;
};

export default Song;
