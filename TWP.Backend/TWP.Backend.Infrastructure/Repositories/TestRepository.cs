using TWP.Backend.Domain.Models;
using TWP.Backend.Infrastructure.Database;

namespace TWP.Backend.Infrastructure.Repositories
{
    public class TestRepository : Repository<TestEntity, long>, ITestRepository
    {
        public TestRepository(DomainContext domainContext)
            : base(domainContext)
        {
        }
    }
}
