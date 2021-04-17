using System.Collections.Generic;

namespace TWP.Backend.Domain.Models
{
    public class SongSectionEntity : IEntity<long>
    {
        public long Id { get; set; }

        public IEnumerable<SongFragmentEntity> Fragments { get; set; }
    }
}
