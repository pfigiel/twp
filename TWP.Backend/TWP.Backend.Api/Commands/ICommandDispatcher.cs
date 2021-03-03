using System.Threading.Tasks;

namespace TWP.Backend.Api.Commands
{
    public interface ICommandDispatcher
    {
        Task ExecuteAsync<TCommand>(TCommand command)
            where TCommand : ICommand;
    }
}
