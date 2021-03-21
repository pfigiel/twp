using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage;
using TWP.Backend.Infrastructure.Database;

namespace TWP.Backend.Infrastructure.Providers
{
    public class DatabaseContextProvider : IDatabaseContextProvider
    {
        private readonly DomainContext _domainContext;

        public DatabaseContextProvider(DomainContext domainContext)
        {
            _domainContext = domainContext;
        }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken)
        {
            return await _domainContext.SaveChangesAsync(cancellationToken);
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken)
        {
            return await _domainContext.Database.BeginTransactionAsync(cancellationToken);
        }
    }
}
