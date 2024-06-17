using System.ComponentModel.DataAnnotations;

namespace API.Dtos.CreateDtos
{
    public class CreateFuelDto
    {
        [Required]
        public string FuelName { get; set; }
    }
}