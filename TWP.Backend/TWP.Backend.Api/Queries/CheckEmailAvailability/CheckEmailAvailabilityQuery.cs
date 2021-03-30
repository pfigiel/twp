namespace TWP.Backend.Api.Queries.CheckEmailAvailability
{
    public class CheckEmailAvailabilityQuery : IQuery<CheckEmailAvailabilityQueryResponse>
    {
        public string Email { get; set; }
    }
}
