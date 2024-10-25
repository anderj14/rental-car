
using API.Dtos;
using API.Dtos.CreateDtos;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDtos;
using Core.Dtos.ModelsDtos;
using Core.Dtos.VehiclesDtos;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {

            CreateMap<AppUser, UserDto>();


            CreateMap<Vehicle, VehicleDto>()
            .ForMember(d => d.Fuel, o => o.MapFrom(s => s.Fuel.FuelName))
            .ForMember(d => d.Brand, o => o.MapFrom(s => s.Brand.BrandName))
            .ForMember(d => d.Model, o => o.MapFrom(s => s.Model.ModelName))
            .ForMember(d => d.VehicleType, o => o.MapFrom(s => s.VehicleType.VehicleTypeName))
            .ForMember(d => d.PictureUrl, o => o.MapFrom<VehicleUrlResolver>());

            // CreateMap<AppUser, UserDto>().ReverseMap();

            CreateMap<Fuel, FuelDto>();
            CreateMap<Brand, BrandDto>();

            CreateMap<Model, ModelDto>()
            .ForMember(d => d.Brand, o => o.MapFrom(s => s.Brand.BrandName));

            // CreateMap<Status, StatusDto>();
            CreateMap<VehicleType, VehicleTypeDto>();

            CreateMap<Insurance, InsuranceDto>();

            CreateMap<Reservation, ReservationDto>()
            .ForMember(d => d.Vehicle, o => o.MapFrom(s => s.Vehicle.VehicleName))
            .ForMember(d => d.Insurance, o => o.MapFrom(s => s.Insurance.InsuranceName))
            .ForMember(dest => dest.VehicleYear, opt => opt.MapFrom(src => src.Vehicle.Year))
            .ForMember(dest => dest.UserFirstName, opt => opt.MapFrom(src => src.AppUser.UserProfile.FirstName))
            .ForMember(dest => dest.UserLastName, opt => opt.MapFrom(src => src.AppUser.UserProfile.LastName))
            .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.AppUser.UserProfile.Phone))
            .ForMember(dest => dest.IdentificationNumber, opt => opt.MapFrom(src => src.AppUser.UserProfile.IdentificationNumber))
            .ForMember(dest => dest.DriverLicense, opt => opt.MapFrom(src => src.AppUser.UserProfile.DriverLicense))
            .ForMember(dest => dest.FirstAddress, opt => opt.MapFrom(src => src.AppUser.Address.FirstAddress))
            .ForMember(dest => dest.FirstAddress, opt => opt.MapFrom(src => src.AppUser.Address.FirstAddress))
            .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.AppUser.Address.City))
            .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.AppUser.Address.Country))
            .ForMember(dest => dest.ZipCode, opt => opt.MapFrom(src => src.AppUser.Address.ZipCode));

            CreateMap<Address, AddressDto>();
            CreateMap<UserProfile, UserProfileDto>();

            // Add
            CreateMap<CreateVehicleDto, Vehicle>();
            CreateMap<CreateReservationDto, Reservation>();
            CreateMap<CreateModelDto, Model>();
            CreateMap<CreateBrandDto, Brand>();
            CreateMap<CreateFuelDto, Fuel>();
            CreateMap<CreateInsuranceDto, Insurance>();
            // CreateMap<CreateStatusDto, Status>();
            CreateMap<CreateVehicleTypeDto, VehicleType>();
            CreateMap<CreateAddressDto, Address>();
            CreateMap<CreateUserProfileDto, UserProfile>();

            CreateMap<Photo, PhotoDto>()
                    .ForMember(d => d.PictureUrl,
                        o => o.MapFrom<PhotoUrlResolver>());
        }
    }
}