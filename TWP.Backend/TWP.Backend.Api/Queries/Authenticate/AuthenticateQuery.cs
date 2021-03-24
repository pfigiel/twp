namespace TWP.Backend.Api.Queries.Authenticate
{
    public class AuthenticateQuery : IQuery<AuthenticateQueryResponse>
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }
}
