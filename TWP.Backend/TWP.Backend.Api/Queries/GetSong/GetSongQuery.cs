namespace TWP.Backend.Api.Queries.GetSong
{
    public class GetSongQuery : IQuery<GetSongQueryResponse>
    {
        public long Id { get; set; }
    }
}
