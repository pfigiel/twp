using TWP.Backend.Domain.Models;

namespace TWP.Backend.Api.Queries.GetSong
{
    public class GetSongQueryResponse : IQueryResponse
    {
        public GetSongQueryResponse(SongEntity song)
        {
            Song = song;
        }

        public SongEntity Song { get; }
    }
}
