﻿using System.Threading;
using System.Threading.Tasks;
using TWP.Backend.Domain.Models;

namespace TWP.Backend.Infrastructure.Repositories
{
    public interface IUserRepository : IRepository<UserEntity, long>
    {
        Task<UserEntity> GetByUsernameAsync(string username, CancellationToken cancellationToken);

        Task<UserEntity> GetByRefreshTokenAsync(string refreshToken, CancellationToken cancellationToken);
    }
}
