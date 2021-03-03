using System.Threading;
using System.Threading.Tasks;

namespace TWP.Backend.Api.Commands
{
    public interface ICommandHandler<in TCommand>
        where TCommand : ICommand
    {
        Task ExecuteAsync(TCommand command, CancellationToken cancellationToken);
    }
}
