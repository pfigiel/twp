using System.ComponentModel.DataAnnotations;

namespace TWP.Backend.Domain.Models
{
    public interface IEntity<TKey>
    {
        [Key]
        public TKey Id { get; set; }
    }
}
