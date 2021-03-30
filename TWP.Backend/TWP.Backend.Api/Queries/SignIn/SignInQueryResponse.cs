namespace TWP.Backend.Api.Queries.SignIn
{
    public class SignInQueryResponse : IQueryResponse
    {
        public string Username { get; set; }

        public string Token { get; set; }

        public string RefreshToken { get; set; }
    }
}
