using Microsoft.AspNetCore.Http;
using TWP.Backend.Domain.Models;

namespace TWP.Backend.Infrastructure.Providers
{
    public class CurrentUserProvider : ICurrentUserProvider
    {
        private readonly UserEntity _userEntity;

        public CurrentUserProvider(IHttpContextAccessor httpContextAccessor)
        {
            _userEntity = (UserEntity)httpContextAccessor.HttpContext.Items["User"];
        }

        public long? Id => _userEntity?.Id;

        public string Username => _userEntity?.Username;
    }
}
