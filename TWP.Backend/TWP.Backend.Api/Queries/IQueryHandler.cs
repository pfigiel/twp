using System.Threading;
using System.Threading.Tasks;

namespace TWP.Backend.Api.Queries
{
    public interface IQueryHandler<in TQuery, TResult>
        where TQuery : IQuery<IQueryResponse>
        where TResult : IQueryResponse
    {
        Task<TResult> ExecuteAsync(TQuery query, CancellationToken cancellationToken);
    }
}
