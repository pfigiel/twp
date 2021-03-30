using System.Threading;
using System.Threading.Tasks;
using TWP.Backend.Infrastructure.Repositories;

namespace TWP.Backend.Api.Queries.CheckEmailAvailability
{
    public class CheckEmailAvailabilityQueryHandler : IQueryHandler<CheckEmailAvailabilityQuery, CheckEmailAvailabilityQueryResponse>
    {
        private readonly IUserRepository _userRepository;

        public CheckEmailAvailabilityQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<CheckEmailAvailabilityQueryResponse> ExecuteAsync(
            CheckEmailAvailabilityQuery query,
            CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByEmailAsync(query.Email, cancellationToken);

            return new CheckEmailAvailabilityQueryResponse() { IsEmailAvailable = user == null };
        }
    }
}
