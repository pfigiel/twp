using System.Threading;
using System.Threading.Tasks;
using TWP.Backend.Infrastructure.Services.Identity;

namespace TWP.Backend.Api.Queries.RefreshToken
{
    public class RefreshTokenQueryHandler : IQueryHandler<RefreshTokenQuery, RefreshTokenQueryResponse>
    {
        private readonly IIdentityService _identityService;

        public RefreshTokenQueryHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<RefreshTokenQueryResponse> ExecuteAsync(RefreshTokenQuery query, CancellationToken cancellationToken)
        {
            var refreshTokenResponse = await _identityService.RefreshTokenAsync(query.RefreshToken, cancellationToken);

            return new RefreshTokenQueryResponse()
            {
                Token = refreshTokenResponse.Token,
                RefreshToken = refreshTokenResponse.RefreshToken,
            };
        }
    }
}
