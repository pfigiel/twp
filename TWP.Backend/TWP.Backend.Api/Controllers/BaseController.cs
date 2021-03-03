using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TWP.Backend.Api.Commands;
using TWP.Backend.Api.Queries;

namespace TWP.Backend.Api.Controllers
{
    public class BaseController : Controller
    {
        private readonly ILogger<BaseController> _logger;
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;

        public BaseController(ILogger<BaseController> logger, IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher = null)
        {
            _logger = logger;
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        protected async Task<IActionResult> HandleRequestAsync<TQuery, TResponse>(TQuery query)
            where TQuery : IQuery<TResponse>
            where TResponse : IQueryResponse
        {
            if (!TryValidateModel(query))
            {
                return BadRequest(query);
            }

            try
            {
                return Ok(await _queryDispatcher.ExecuteAsync(query));
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, exception.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        protected async Task<IActionResult> HandleRequestAsync<TCommand>(TCommand command)
            where TCommand : ICommand
        {
            if (!TryValidateModel(command))
            {
                return BadRequest(command);
            }

            try
            {
                await _commandDispatcher.ExecuteAsync(command);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, exception.Message);

                return StatusCode((int)HttpStatusCode.InternalServerError);
            }

            return Ok();
        }
    }
}
