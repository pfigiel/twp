using System.Threading;
using System.Threading.Tasks;
using TWP.Backend.Domain.Models;
using TWP.Backend.Infrastructure.Services.Identity;

namespace TWP.Backend.Api.Commands.Register
{
    public class RegisterCommandHandler : ICommandHandler<RegisterCommand>
    {
        private readonly IIdentityService _identityService;

        public RegisterCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task ExecuteAsync(RegisterCommand command, CancellationToken cancellationToken)
        {
            var userEntity = new UserEntity() { Username = command.Username };
            await _identityService.CreateUserAsync(userEntity, command.Password, cancellationToken);
        }
    }
}
