using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage;
using TWP.Backend.Infrastructure.Database;

namespace TWP.Backend.Infrastructure.Providers
{
    public class DatabaseContextProvider : IDatabaseContextProvider
    {
        private readonly ApplicationContext _applicationContext;

        public DatabaseContextProvider(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken)
        {
            return await _applicationContext.SaveChangesAsync(cancellationToken);
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken)
        {
            return await _applicationContext.Database.BeginTransactionAsync(cancellationToken);
        }
    }
}
