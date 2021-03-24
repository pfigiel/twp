using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TWP.Backend.Api.Commands;
using TWP.Backend.Api.Commands.Register;
using TWP.Backend.Api.Commands.RevokeRefreshToken;
using TWP.Backend.Api.Queries;
using TWP.Backend.Api.Queries.Authenticate;
using TWP.Backend.Api.Queries.Healthcheck;
using TWP.Backend.Api.Queries.RefreshToken;
using TWP.Backend.Infrastructure.Providers;

namespace TWP.Backend.Api
{
    public static class ApiModule
    {
        public static IServiceCollection AddApiDependencies(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            if (configuration == null)
            {
                throw new ArgumentNullException(nameof(configuration));
            }

            serviceCollection.AddHttpContextAccessor();

            serviceCollection.AddScoped<ICancellationTokenProvider, CancellationTokenProvider>();

            serviceCollection.AddScoped<IQueryDispatcher, QueryDispatcher>();
            serviceCollection.AddScoped<ICommandDispatcher, CommandDispatcher>();

            serviceCollection.AddScoped<IQueryHandler<PingQuery, PingQueryResponse>, PingQueryHandler>();
            serviceCollection.AddScoped<IQueryHandler<AuthenticateQuery, AuthenticateQueryResponse>, AuthenticateQueryHandler>();
            serviceCollection.AddScoped<IQueryHandler<RefreshTokenQuery, RefreshTokenQueryResponse>, RefreshTokenQueryHandler>();

            serviceCollection.AddScoped<ICommandHandler<RegisterCommand>, RegisterCommandHandler>();
            serviceCollection.AddScoped<ICommandHandler<RevokeRefreshTokenCommand>, RevokeRefreshTokenCommandHandler>();

            return serviceCollection;
        }
    }
}
