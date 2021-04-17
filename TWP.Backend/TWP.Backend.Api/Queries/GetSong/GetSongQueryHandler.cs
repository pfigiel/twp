using System.Threading;
using System.Threading.Tasks;
using TWP.Backend.Infrastructure.Repositories;

namespace TWP.Backend.Api.Queries.GetSong
{
    public class GetSongQueryHandler : IQueryHandler<GetSongQuery, GetSongQueryResponse>
    {
        private readonly ISongRepository _songRepository;

        public GetSongQueryHandler(ISongRepository songRepository)
        {
            _songRepository = songRepository;
        }

        public async Task<GetSongQueryResponse> ExecuteAsync(GetSongQuery query, CancellationToken cancellationToken)
        {
            var song = await _songRepository.GetByIdAsync(query.Id, cancellationToken);

            return new GetSongQueryResponse(song);
        }
    }
}
