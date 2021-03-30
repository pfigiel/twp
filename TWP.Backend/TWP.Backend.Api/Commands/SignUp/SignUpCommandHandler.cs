using System.Threading;
using System.Threading.Tasks;
using TWP.Backend.Domain.Models;
using TWP.Backend.Infrastructure.Services.Identity;

namespace TWP.Backend.Api.Commands.SignUp
{
    public class SignUpCommandHandler : ICommandHandler<SignUpCommand>
    {
        private readonly IIdentityService _identityService;

        public SignUpCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task ExecuteAsync(SignUpCommand command, CancellationToken cancellationToken)
        {
            var userEntity = new UserEntity() { Email = command.Email, Username = command.Username };
            await _identityService.CreateUserAsync(userEntity, command.Password, cancellationToken);
        }
    }
}
