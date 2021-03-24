namespace TWP.Backend.Infrastructure.Configurations
{
    public class Configuration
    {
        public ClientAppConfiguration ClientApp { get; set; } = new ClientAppConfiguration();

        public DatabaseConfiguration Database { get; set; } = new DatabaseConfiguration();

        public IdentityConfiguration Identity { get; set; } = new IdentityConfiguration();
    }
}
