using System.ComponentModel.DataAnnotations;

namespace API.Dtos.CreateDtos
{
    public class CreateVehicleTypeDto
    {
        [Required]
        public string VehicleTypeName { get; set; }
    }
}