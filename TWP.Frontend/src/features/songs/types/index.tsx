export interface Song {
    id: number;
    title: string;
    artist: string;
}

interface SongFragment {
    id: number;
    text: string;
    repeatCount: number;
}

interface SongSection {
    id: number;
    fragments: SongFragment[];
}

export interface SongDetails extends Song {
    sections: SongSection[];
}

export interface GetSongResponseDto {
    song: SongDetails;
}

export interface GetSongsResponseDto {
    songs: Song[];
}
