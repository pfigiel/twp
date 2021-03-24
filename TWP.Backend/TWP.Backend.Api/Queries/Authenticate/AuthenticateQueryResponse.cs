namespace TWP.Backend.Api.Queries.Authenticate
{
    public class AuthenticateQueryResponse : IQueryResponse
    {
        public string Username { get; set; }

        public string Token { get; set; }

        public string RefreshToken { get; set; }
    }
}
