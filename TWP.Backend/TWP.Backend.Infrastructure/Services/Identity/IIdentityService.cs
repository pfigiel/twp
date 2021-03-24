using System.Threading;
using System.Threading.Tasks;
using TWP.Backend.Domain.Models;

namespace TWP.Backend.Infrastructure.Services.Identity
{
    public interface IIdentityService
    {
        Task<UserEntity> AuthenticateAsync(string username, string password, CancellationToken cancellationToken);

        Task<UserEntity> CreateUserAsync(UserEntity userEntity, string password, CancellationToken cancellationToken);

        Task<RefreshTokenServiceResponse> RefreshTokenAsync(string token, CancellationToken cancellationToken);

        Task RevokeRefreshTokenAsync(string token, CancellationToken cancellationToken);

        string GenerateJwtToken(UserEntity user);

        RefreshTokenEntity GenerateRefreshToken();
    }
}
