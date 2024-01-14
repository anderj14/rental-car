
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
            var photo = source.Photos.FirstOrDefault(x => x.IsMain);

            if (photo != null)
            {
                return _config["ApiUrl"] + photo.PictureUrl;
            }

            return _config["ApiUrl"] + "images/vehicles/vehicle.jpg";
        }
    }
}