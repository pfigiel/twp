namespace TWP.Backend.Api.Queries.SignIn
{
    public class SignInQuery : IQuery<SignInQueryResponse>
    {
        public string UsernameOrEmail { get; set; }

        public string Password { get; set; }
    }
}
