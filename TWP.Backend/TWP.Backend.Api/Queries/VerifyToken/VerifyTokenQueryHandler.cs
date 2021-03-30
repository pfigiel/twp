using System;
using System.Threading;
using System.Threading.Tasks;
using TWP.Backend.Infrastructure.Providers;

namespace TWP.Backend.Api.Queries.VerifyToken
{
    public class VerifyTokenQueryHandler : IQueryHandler<VerifyTokenQuery, VerifyTokenQueryResponse>
    {
        private readonly ICurrentUserProvider _currentUserProvider;

        public VerifyTokenQueryHandler(ICurrentUserProvider currentUserProvider)
        {
            _currentUserProvider = currentUserProvider;
        }

        public async Task<VerifyTokenQueryResponse> ExecuteAsync(VerifyTokenQuery query, CancellationToken cancellationToken)
        {
            if (_currentUserProvider.Id == null)
            {
                throw new InvalidOperationException("No user associated with the provided token has been found.");
            }

            return await Task.FromResult(new VerifyTokenQueryResponse(_currentUserProvider.Username));
        }
    }
}
