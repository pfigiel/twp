using Microsoft.EntityFrameworkCore;
using TWP.Backend.Domain.Models;

namespace TWP.Backend.Infrastructure.Database
{
    public class DomainContext : DbContext
    {
        public DomainContext(DbContextOptions<DomainContext> options)
            : base(options)
        {
        }

        public DbSet<TestEntity> Tests { get; set; }
    }
}
