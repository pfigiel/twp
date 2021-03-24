namespace TWP.Backend.Infrastructure.Configurations
{
    public class IdentityConfiguration
    {
        public string Secret { get; set; }

        public int AccessTokenLifetimeMinutes { get; set; }

        public int RefreshTokenLifetimeMinutes { get; set; }
    }
}
