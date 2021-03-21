using System.ComponentModel.DataAnnotations;

namespace TWP.Backend.Domain.Models
{
    public class TestEntity : IEntity<long>
    {
        [Key]
        public long Id { get; set; }

        public string Text { get; set; }
    }
}
