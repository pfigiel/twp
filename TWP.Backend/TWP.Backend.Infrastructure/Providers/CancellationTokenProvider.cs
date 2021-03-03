using System.Threading;
using Microsoft.AspNetCore.Http;

namespace TWP.Backend.Infrastructure.Providers
{
    public class CancellationTokenProvider : ICancellationTokenProvider
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CancellationTokenProvider(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public CancellationToken GetCancellationToken()
        {
            return _httpContextAccessor.HttpContext.RequestAborted;
        }
    }
}
