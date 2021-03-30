using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TWP.Backend.Domain.Models;
using TWP.Backend.Infrastructure.Database;

namespace TWP.Backend.Infrastructure.Repositories
{
    public class UserRepository : Repository<UserEntity, long>, IUserRepository
    {
        public UserRepository(ApplicationContext applicationContext)
            : base(applicationContext)
        {
        }

        public async Task<UserEntity> GetByEmailAsync(string email, CancellationToken cancellationToken)
        {
            return await Query.Where(user => user.Email == email).FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<UserEntity> GetByUsernameAsync(string username, CancellationToken cancellationToken)
        {
            return await Query.Where(user => user.Username == username).FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<UserEntity> GetByUsernameOrEmailAsync(string usernameOrEmail, CancellationToken cancellationToken)
        {
            return await Query
                .Where(user => user.Email == usernameOrEmail || user.Username == usernameOrEmail)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<UserEntity> GetByRefreshTokenAsync(string refreshToken, CancellationToken cancellationToken)
        {
            return await Query
                .FirstOrDefaultAsync(user => user.RefreshTokens.Any(token => token.Token.Equals(refreshToken)), cancellationToken);
        }
    }
}
