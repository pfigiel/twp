using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TWP.Backend.Domain.Models;
using TWP.Backend.Infrastructure.Database;

namespace TWP.Backend.Infrastructure.Repositories
{
    public abstract class Repository<TEntity, TKey> : IRepository<TEntity, TKey>
        where TEntity : class, IEntity<TKey>
    {
        protected Repository(DomainContext context)
        {
            Context = context ?? throw new ArgumentException(nameof(context));
        }

        public IQueryable<TEntity> Query => Context.Set<TEntity>();

        protected DomainContext Context { get; }

        public async Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await Query.ToListAsync(cancellationToken);
        }

        public async Task<TEntity> GetByIdAsync(TKey id, CancellationToken cancellationToken)
        {
            return await Query.Where(entity => entity.Id.Equals(id)).FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<TEntity> AddAsync(TEntity entity, CancellationToken cancellationToken)
        {
            await Context.AddAsync(entity, cancellationToken);

            return entity;
        }

        public TEntity Update(TEntity entity)
        {
            Context.Update(entity);

            return entity;
        }
    }
}
