using System.Collections.Generic;
using TWP.Backend.Infrastructure.Dtos;

namespace TWP.Backend.Api.Queries.GetSongs
{
    public class GetSongsQueryResponse : IQueryResponse
    {
        public GetSongsQueryResponse(IEnumerable<SongDto> songs)
        {
            Songs = songs;
        }

        public IEnumerable<SongDto> Songs { get; }
    }
}
