using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using TWP.Backend.Infrastructure.Providers;

namespace TWP.Backend.Api.Queries
{
    public class QueryDispatcher : IQueryDispatcher
    {
        private static readonly ConcurrentDictionary<Type, Type> Handlers = new ();
        private readonly ICancellationTokenProvider _cancellationTokenProvider;
        private readonly IServiceProvider _serviceProvider;

        public QueryDispatcher(ICancellationTokenProvider cancellationTokenProvider, IServiceProvider serviceProvider)
        {
            _cancellationTokenProvider = cancellationTokenProvider;
            _serviceProvider = serviceProvider;
        }

        public async Task<TResult> ExecuteAsync<TResult>(IQuery<TResult> query)
            where TResult : IQueryResponse
        {
            if (query == null)
            {
                throw new ArgumentNullException(nameof(query));
            }

            var handlerType = GetHandlerType(query.GetType(), typeof(TResult));

            dynamic queryHandler = _serviceProvider.GetService(handlerType);

            if (queryHandler == null)
            {
                throw new ArgumentException($"Missing handler for query {query.GetType().FullName}");
            }

            return await (Task<TResult>)queryHandler.ExecuteAsync((dynamic)query, _cancellationTokenProvider.GetCancellationToken());
        }

        private static Type GetHandlerType(Type queryType, Type resultType)
        {
            if (Handlers.ContainsKey(queryType))
            {
                return Handlers[queryType];
            }

            var handlerType = typeof(IQueryHandler<,>).MakeGenericType(queryType, resultType);

            Handlers[queryType] = handlerType;

            return handlerType;
        }
    }
}
