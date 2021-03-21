using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TWP.Backend.Infrastructure.Providers;
using TWP.Backend.Infrastructure.Repositories;

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

            serviceCollection.AddScoped<IDatabaseContextProvider, DatabaseContextProvider>();
            serviceCollection.AddScoped<ICancellationTokenProvider, CancellationTokenProvider>();

            serviceCollection.AddScoped<ITestRepository, TestRepository>();

            return serviceCollection;
        }
    }
}
