using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TWP.Backend.Api.Attributes;
using TWP.Backend.Api.Commands;
using TWP.Backend.Api.Commands.RevokeRefreshToken;
using TWP.Backend.Api.Commands.SignUp;
using TWP.Backend.Api.Queries;
using TWP.Backend.Api.Queries.CheckEmailAvailability;
using TWP.Backend.Api.Queries.CheckUsernameAvailability;
using TWP.Backend.Api.Queries.RefreshToken;
using TWP.Backend.Api.Queries.SignIn;
using TWP.Backend.Api.Queries.VerifyToken;

namespace TWP.Backend.Api.Controllers
{
    [Route("api/identity")]
    public class IdentityController : BaseController
    {
        public IdentityController(
            ILogger<IdentityController> logger,
            IQueryDispatcher queryDispatcher,
            ICommandDispatcher commandDispatcher)
            : base(logger, queryDispatcher, commandDispatcher)
        {
        }

        [Authorize]
        [HttpGet("verify-token")]
        public async Task<IActionResult> VerifyToken()
        {
            return await HandleRequestAsync<VerifyTokenQuery, VerifyTokenQueryResponse>(new VerifyTokenQuery());
        }

        [HttpGet("check-email-availability")]
        public async Task<IActionResult> CheckEmailAvailability([FromQuery] CheckEmailAvailabilityQuery query)
        {
            return await HandleRequestAsync<CheckEmailAvailabilityQuery, CheckEmailAvailabilityQueryResponse>(query);
        }

        [HttpGet("check-username-availability")]
        public async Task<IActionResult> CheckUsernameAvailability([FromQuery] CheckUsernameAvailabilityQuery query)
        {
            return await HandleRequestAsync<CheckUsernameAvailabilityQuery, CheckUsernameAvailabilityQueryResponse>(query);
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> Authenticate([FromBody] SignInQuery query)
        {
            return await HandleRequestAsync<SignInQuery, SignInQueryResponse>(query);
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> Register([FromBody] SignUpCommand command)
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
