using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TWP.Backend.Infrastructure.Providers;
using TWP.Backend.Infrastructure.Repositories;
using TWP.Backend.Infrastructure.Services.Identity;

namespace TWP.Backend.Infrastructure
{
    public static class InfrastructureModule
    {
        public static IServiceCollection AddInfrastructureDependencies(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            if (configuration == null)
            {
                throw new ArgumentNullException(nameof(configuration));
            }

            serviceCollection.AddScoped<IDateTimeProvider, DateTimeProvider>();
            serviceCollection.AddScoped<ICurrentUserProvider, CurrentUserProvider>();
            serviceCollection.AddScoped<IDatabaseContextProvider, DatabaseContextProvider>();
            serviceCollection.AddScoped<ICancellationTokenProvider, CancellationTokenProvider>();

            serviceCollection.AddScoped<IUserRepository, UserRepository>();

            serviceCollection.AddScoped<IIdentityService, IdentityService>();

            return serviceCollection;
        }
    }
}
