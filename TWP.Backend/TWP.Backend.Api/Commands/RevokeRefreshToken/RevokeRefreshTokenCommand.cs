namespace TWP.Backend.Api.Commands.RevokeRefreshToken
{
    public class RevokeRefreshTokenCommand : ICommand
    {
        public string RefreshToken { get; set; }
    }
}
