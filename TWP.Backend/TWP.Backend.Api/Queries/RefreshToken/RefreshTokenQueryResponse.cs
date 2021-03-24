namespace TWP.Backend.Api.Queries.RefreshToken
{
    public class RefreshTokenQueryResponse : IQueryResponse
    {
        public string Token { get; set; }

        public string RefreshToken { get; set; }
    }
}
