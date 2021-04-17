using Microsoft.EntityFrameworkCore;
using TWP.Backend.Domain.Models;

namespace TWP.Backend.Infrastructure.Database
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }

        public DbSet<UserEntity> Users { get; set; }

        public DbSet<SongEntity> Songs { get; set; }

        public DbSet<SongSectionEntity> SongsSections { get; set; }

        public DbSet<SongFragmentEntity> SongFragments { get; set; }

        public DbSet<RefreshTokenEntity> RefreshTokens { get; set; }
    }
}
