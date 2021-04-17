using System.Collections.Generic;

namespace TWP.Backend.Domain.Models
{
    public class SongEntity : IEntity<long>
    {
        public long Id { get; set; }

        public string Title { get; set; }

        public string Artist { get; set; }

        public IEnumerable<SongSectionEntity> Sections { get; set; }
    }
}
