using System;

namespace TWP.Backend.Infrastructure.Providers
{
    public interface IDateTimeProvider
    {
        public DateTime UtcNow { get; }
    }
}
