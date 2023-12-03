
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDtos;
using Core.Dtos.VehiclesDtos;
using Core.Entities;
using Core.Entities.Identity;

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
            .ForMember(d => d.VehicleType, o => o.MapFrom(s => s.VehicleType.VehicleTypeName));

            CreateMap<Fuel, FuelDto>();
            CreateMap<Brand, BrandDto>();

            CreateMap<Model, ModelDto>()
            .ForMember(d => d.Brand, o => o.MapFrom(s => s.Brand.BrandName));

            CreateMap<Status, StatusDto>();
            CreateMap<VehicleType, VehicleTypeDto>();
            CreateMap<Customer, CustomerDto>();
            CreateMap<Insurance, InsuranceDto>();

            CreateMap<Reservation, ReservationDto>()
            .ForMember(d => d.Customer, o => o.MapFrom(s => s.Customer.CustomerName))
            .ForMember(d => d.Vehicle, o => o.MapFrom(s => s.Vehicle.VehicleName))
            .ForMember(d => d.Insurance, o => o.MapFrom(s => s.Insurance.InsuranceName));
            
            CreateMap<Invoice, InvoiceDto>()
            .ForMember(d => d.Customer, o => o.MapFrom(s => s.Customer.CustomerName))
            .ForMember(d => d.Reservation, o => o.MapFrom(s => s.Reservation.ReservationNumber));

            CreateMap<Address, AddressDto>().ReverseMap();

            // Add
            CreateMap<CreateVehicleDto, Vehicle>();
            CreateMap<CreateCustomerDto, Customer>();
            CreateMap<CreateReservationDto, Reservation>();
            CreateMap<CreateInvoiceDto, Invoice>();
        }
    }
}