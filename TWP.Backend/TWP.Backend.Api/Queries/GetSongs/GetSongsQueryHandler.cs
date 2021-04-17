using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using TWP.Backend.Infrastructure.Dtos;
using TWP.Backend.Infrastructure.Repositories;

namespace TWP.Backend.Api.Queries.GetSongs
{
    public class GetSongsQueryHandler : IQueryHandler<GetSongsQuery, GetSongsQueryResponse>
    {
        private readonly IMapper _mapper;
        private readonly ISongRepository _songRepository;

        public GetSongsQueryHandler(IMapper mapper, ISongRepository songRepository)
        {
            _mapper = mapper;
            _songRepository = songRepository;
        }

        public async Task<GetSongsQueryResponse> ExecuteAsync(GetSongsQuery query, CancellationToken cancellationToken)
        {
            var songs = await _songRepository.GetAllAsync(cancellationToken);
            var mappedSongs = songs.Select(song => _mapper.Map<SongDto>(song));

            return new GetSongsQueryResponse(mappedSongs);
        }
    }
}
