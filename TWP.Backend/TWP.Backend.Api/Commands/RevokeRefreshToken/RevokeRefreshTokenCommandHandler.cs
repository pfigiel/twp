using System.Threading;
using System.Threading.Tasks;
using TWP.Backend.Infrastructure.Services.Identity;

namespace TWP.Backend.Api.Commands.RevokeRefreshToken
{
    public class RevokeRefreshTokenCommandHandler : ICommandHandler<RevokeRefreshTokenCommand>
    {
        private readonly IIdentityService _identityService;

        public RevokeRefreshTokenCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task ExecuteAsync(RevokeRefreshTokenCommand command, CancellationToken cancellationToken)
        {
            await _identityService.RevokeRefreshTokenAsync(command.RefreshToken, cancellationToken);
        }
    }
}
