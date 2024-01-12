
using AutoMapper;
using Core.Dtos;
using Core.Entities;

namespace API.Helpers
{
    public class VehicleUrlResolver : IValueResolver<Vehicle, VehicleDto, string>
    {
        private readonly IConfiguration _config;
        public VehicleUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Vehicle source, VehicleDto destination,
        string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.Picture))
            {
                return _config["ApiUrl"] + source.Picture;
            }

            return null;
        }
    }
}