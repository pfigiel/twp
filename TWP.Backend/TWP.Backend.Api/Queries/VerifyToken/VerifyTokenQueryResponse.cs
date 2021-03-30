namespace TWP.Backend.Api.Queries.VerifyToken
{
    public class VerifyTokenQueryResponse : IQueryResponse
    {
        public VerifyTokenQueryResponse(string username)
        {
            Username = username;
        }

        public string Username { get; set; }
    }
}
