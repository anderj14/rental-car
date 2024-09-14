
using System.ComponentModel.DataAnnotations;

namespace API.Dtos.CreateDtos
{
    public class CreateAddressDto
    {
        [Required]
        public string FirstAddress { get; set; }
        public string SecondAddress { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string ZipCode { get; set; }
    }
}