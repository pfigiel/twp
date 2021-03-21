using System;
using System.Threading.Tasks;
using TWP.Backend.Infrastructure.Providers;

namespace TWP.Backend.Api.Commands
{
    public class CommandDispatcher : ICommandDispatcher
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IDatabaseContextProvider _databaseContextProvider;
        private readonly ICancellationTokenProvider _cancellationTokenProvider;

        public CommandDispatcher(IServiceProvider serviceProvider, IDatabaseContextProvider databaseContextProvider, ICancellationTokenProvider cancellationTokenProvider)
        {
            _serviceProvider = serviceProvider;
            _databaseContextProvider = databaseContextProvider;
            _cancellationTokenProvider = cancellationTokenProvider;
        }

        public async Task ExecuteAsync<TCommand>(TCommand command)
            where TCommand : ICommand
        {
            if (command == null)
            {
                throw new ArgumentNullException(nameof(command));
            }

            var handler = (ICommandHandler<TCommand>)_serviceProvider.GetService(typeof(ICommandHandler<TCommand>));

            if (handler == null)
            {
                throw new ArgumentException($"Missing handler for command {command.GetType().FullName}");
            }

            var cancellationToken = _cancellationTokenProvider.GetCancellationToken();

            await using var transaction = await _databaseContextProvider.BeginTransactionAsync(cancellationToken);
            await handler.ExecuteAsync(command, cancellationToken);
            await _databaseContextProvider.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);
        }
    }
}
