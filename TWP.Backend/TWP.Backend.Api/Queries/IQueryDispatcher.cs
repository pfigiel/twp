using System.Threading.Tasks;

namespace TWP.Backend.Api.Queries
{
    public interface IQueryDispatcher
    {
        Task<TResult> ExecuteAsync<TResult>(IQuery<TResult> query)
            where TResult : IQueryResponse;
    }
}
