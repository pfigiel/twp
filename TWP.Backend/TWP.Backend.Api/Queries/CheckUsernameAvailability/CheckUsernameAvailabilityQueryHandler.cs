using System.Threading;
using System.Threading.Tasks;
using TWP.Backend.Infrastructure.Repositories;

namespace TWP.Backend.Api.Queries.CheckUsernameAvailability
{
    public class CheckUsernameAvailabilityQueryHandler : IQueryHandler<CheckUsernameAvailabilityQuery, CheckUsernameAvailabilityQueryResponse>
    {
        private readonly IUserRepository _userRepository;

        public CheckUsernameAvailabilityQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<CheckUsernameAvailabilityQueryResponse> ExecuteAsync(
            CheckUsernameAvailabilityQuery query,
            CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByUsernameAsync(query.Username, cancellationToken);

            return new CheckUsernameAvailabilityQueryResponse() { IsUsernameAvailable = user == null };
        }
    }
}
