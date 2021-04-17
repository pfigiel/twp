namespace TWP.Backend.Domain.Models
{
    public class SongFragmentEntity : IEntity<long>
    {
        public long Id { get; set; }

        public string Text { get; set; }

        public int RepeatCount { get; set; }
    }
}
