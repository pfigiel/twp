using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TWP.Backend.Domain.Models;
using TWP.Backend.Infrastructure.Database;

namespace TWP.Backend.Infrastructure.Repositories
{
    public class SongRepository : Repository<SongEntity, long>, ISongRepository
    {
        public SongRepository(ApplicationContext applicationContext)
            : base(applicationContext)
        {
        }

        public new async Task<SongEntity> GetByIdAsync(long id, CancellationToken cancellationToken)
        {
            return await Query
                .Where(song => song.Id == id)
                .Include(song => song.Sections)
                .ThenInclude(section => section.Fragments)
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}
