using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TWP.Backend.Api.Commands;
using TWP.Backend.Api.Queries;
using TWP.Backend.Api.Queries.Healthcheck;

namespace TWP.Backend.Api.Controllers
{
    [Route("api/healthcheck")]
    public class HealthcheckController : BaseController
    {
        public HealthcheckController(ILogger<BaseController> logger, IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
            : base(logger, queryDispatcher, commandDispatcher)
        {
        }

        [HttpGet]
        public async Task<IActionResult> Ping()
        {
            return await HandleRequestAsync<PingQuery, PingQueryResponse>(new PingQuery());
        }
    }
}
