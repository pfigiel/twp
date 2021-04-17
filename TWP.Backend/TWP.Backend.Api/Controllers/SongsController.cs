using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TWP.Backend.Api.Commands;
using TWP.Backend.Api.Queries;
using TWP.Backend.Api.Queries.GetSong;
using TWP.Backend.Api.Queries.GetSongs;

namespace TWP.Backend.Api.Controllers
{
    [Route("api/songs")]
    public class SongsController : BaseController
    {
        public SongsController(
            ILogger<SongsController> logger,
            IQueryDispatcher queryDispatcher,
            ICommandDispatcher commandDispatcher)
            : base(logger, queryDispatcher, commandDispatcher)
        {
        }

        [HttpGet]
        public async Task<IActionResult> GetSongs([FromQuery] GetSongsQuery query)
        {
            return await HandleRequestAsync<GetSongsQuery, GetSongsQueryResponse>(query);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetSong([FromRoute] GetSongQuery query)
        {
            return await HandleRequestAsync<GetSongQuery, GetSongQueryResponse>(query);
        }
    }
}
