using TWP.Backend.Domain.Models;

namespace TWP.Backend.Infrastructure.Repositories
{
    public interface ITestRepository : IRepository<TestEntity, long>
    {
    }
}
