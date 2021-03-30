namespace TWP.Backend.Infrastructure.Providers
{
    public interface ICurrentUserProvider
    {
        public long? Id { get; }

        public string Username { get; }
    }
}
