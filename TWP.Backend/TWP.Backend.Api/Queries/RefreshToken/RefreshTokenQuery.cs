namespace TWP.Backend.Api.Queries.RefreshToken
{
    public class RefreshTokenQuery : IQuery<RefreshTokenQueryResponse>
    {
        public string RefreshToken { get; set; }
    }
}
