using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TWP.Backend.Api.Attributes;
using TWP.Backend.Api.Commands;
using TWP.Backend.Api.Commands.Register;
using TWP.Backend.Api.Commands.RevokeRefreshToken;
using TWP.Backend.Api.Queries;
using TWP.Backend.Api.Queries.Authenticate;
using TWP.Backend.Api.Queries.RefreshToken;

namespace TWP.Backend.Api.Controllers
{
    [Route("api/identity")]
    public class IdentityController : BaseController
    {
        public IdentityController(ILogger<IdentityController> logger, IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
            : base(logger, queryDispatcher, commandDispatcher)
        {
        }

        [HttpGet("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateQuery query)
        {
            return await HandleRequestAsync<AuthenticateQuery, AuthenticateQueryResponse>(query);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand command)
        {
            return await HandleRequestAsync(command);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenQuery query)
        {
            return await HandleRequestAsync<RefreshTokenQuery, RefreshTokenQueryResponse>(query);
        }

        [HttpPost("revoke-refresh-token")]
        public async Task<IActionResult> RevokeToken([FromBody] RevokeRefreshTokenCommand command)
        {
            return await HandleRequestAsync(command);
        }
    }
}
