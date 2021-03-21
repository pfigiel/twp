using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TWP.Backend.Domain.Models;

namespace TWP.Backend.Infrastructure.Repositories
{
    public interface IRepository<TEntity, in TKey>
        where TEntity : IEntity<TKey>
    {
        IQueryable<TEntity> Query { get; }

        Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken);

        Task<TEntity> GetByIdAsync(TKey id, CancellationToken cancellationToken);

        Task<TEntity> AddAsync(TEntity entity, CancellationToken cancellationToken);

        TEntity Update(TEntity entity);
    }
}
