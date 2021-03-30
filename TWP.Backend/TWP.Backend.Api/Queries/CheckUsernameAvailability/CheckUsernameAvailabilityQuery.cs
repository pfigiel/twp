namespace TWP.Backend.Api.Queries.CheckUsernameAvailability
{
    public class CheckUsernameAvailabilityQuery : IQuery<CheckUsernameAvailabilityQueryResponse>
    {
        public string Username { get; set; }
    }
}
