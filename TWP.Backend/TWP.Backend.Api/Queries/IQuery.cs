namespace TWP.Backend.Api.Queries
{
    public interface IQuery<out TResult>
        where TResult : IQueryResponse
    {
    }
}
