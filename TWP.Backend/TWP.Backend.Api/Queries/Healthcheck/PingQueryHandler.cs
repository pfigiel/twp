using System.Threading;
using System.Threading.Tasks;

namespace TWP.Backend.Api.Queries.Healthcheck
{
    public class PingQueryHandler : IQueryHandler<PingQuery, PingQueryResponse>
    {
        public async Task<PingQueryResponse> ExecuteAsync(PingQuery query, CancellationToken cancellationToken)
        {
            return await Task.FromResult(new PingQueryResponse());
        }
    }
}
