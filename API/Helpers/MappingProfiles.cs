
using AutoMapper;
using Core.Dtos;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Vehicle, VehicleDto>()
            .ForMember(d => d.Fuel, o => o.MapFrom(s => s.Fuel.FuelName))
            .ForMember(d => d.Brand, o => o.MapFrom(s => s.Brand.BrandName))
            .ForMember(d => d.Model, o => o.MapFrom(s => s.Model.ModelName))
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.StatusName))
            .ForMember(d => d.VehicleType, o => o.MapFrom(s => s.VehicleType.VehicleTypeName))
            .ForMember(d => d.Insurance, o => o.MapFrom(s => s.Insurance.InsuranceName))
            .ForMember(d => d.Picture, o => o.MapFrom<VehicleUrlResolver>());
        }
    }
}