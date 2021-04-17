using AutoMapper;
using TWP.Backend.Domain.Models;
using TWP.Backend.Infrastructure.Dtos;

namespace TWP.Backend.Infrastructure.Mappers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<SongEntity, SongDto>();
        }
    }
}
