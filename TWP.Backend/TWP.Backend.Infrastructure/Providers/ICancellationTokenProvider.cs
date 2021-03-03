using System.Threading;

namespace TWP.Backend.Infrastructure.Providers
{
    public interface ICancellationTokenProvider
    {
        CancellationToken GetCancellationToken();
    }
}
