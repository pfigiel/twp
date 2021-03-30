using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TWP.Backend.Api.Commands;
using TWP.Backend.Api.Commands.RevokeRefreshToken;
using TWP.Backend.Api.Commands.SignUp;
using TWP.Backend.Api.Queries;
using TWP.Backend.Api.Queries.CheckEmailAvailability;
using TWP.Backend.Api.Queries.CheckUsernameAvailability;
using TWP.Backend.Api.Queries.Healthcheck;
using TWP.Backend.Api.Queries.RefreshToken;
using TWP.Backend.Api.Queries.SignIn;
using TWP.Backend.Api.Queries.VerifyToken;
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
            serviceCollection.AddScoped<IQueryHandler<SignInQuery, SignInQueryResponse>, SignInQueryHandler>();
            serviceCollection.AddScoped<IQueryHandler<VerifyTokenQuery, VerifyTokenQueryResponse>, VerifyTokenQueryHandler>();
            serviceCollection.AddScoped<IQueryHandler<RefreshTokenQuery, RefreshTokenQueryResponse>, RefreshTokenQueryHandler>();
            serviceCollection.AddScoped<IQueryHandler<CheckEmailAvailabilityQuery, CheckEmailAvailabilityQueryResponse>, CheckEmailAvailabilityQueryHandler>();
            serviceCollection.AddScoped<IQueryHandler<CheckUsernameAvailabilityQuery, CheckUsernameAvailabilityQueryResponse>, CheckUsernameAvailabilityQueryHandler>();

            serviceCollection.AddScoped<ICommandHandler<SignUpCommand>, SignUpCommandHandler>();
            serviceCollection.AddScoped<ICommandHandler<RevokeRefreshTokenCommand>, RevokeRefreshTokenCommandHandler>();

            return serviceCollection;
        }
    }
}
