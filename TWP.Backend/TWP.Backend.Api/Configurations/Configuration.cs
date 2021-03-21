namespace TWP.Backend.Api.Configurations
{
    public class Configuration
    {
        public ClientAppConfiguration ClientApp { get; set; } = new ClientAppConfiguration();

        public DatabaseConfiguration Database { get; set; } = new DatabaseConfiguration();
    }
}
