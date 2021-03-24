using System.Threading;
using System.Threading.Tasks;
using TWP.Backend.Infrastructure.Providers;
using TWP.Backend.Infrastructure.Repositories;
using TWP.Backend.Infrastructure.Services.Identity;

namespace TWP.Backend.Api.Queries.Authenticate
{
    public class AuthenticateQueryHandler : IQueryHandler<AuthenticateQuery, AuthenticateQueryResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IIdentityService _identityService;
        private readonly IDatabaseContextProvider _databaseContextProvider;

        public AuthenticateQueryHandler(
            IUserRepository userRepository,
            IIdentityService identityService,
            IDatabaseContextProvider databaseContextProvider)
        {
            _userRepository = userRepository;
            _identityService = identityService;
            _databaseContextProvider = databaseContextProvider;
        }

        public async Task<AuthenticateQueryResponse> ExecuteAsync(AuthenticateQuery query, CancellationToken cancellationToken)
        {
            var user = await _identityService.AuthenticateAsync(query.Username, query.Password, cancellationToken);
            var token = _identityService.GenerateJwtToken(user);
            var refreshToken = _identityService.GenerateRefreshToken();

            _userRepository.Update(user);
            user.RefreshTokens.Add(refreshToken);
            await _databaseContextProvider.SaveChangesAsync(cancellationToken);

            return new AuthenticateQueryResponse() { Username = user.Username, Token = token, RefreshToken = refreshToken.Token };
        }
    }
}
