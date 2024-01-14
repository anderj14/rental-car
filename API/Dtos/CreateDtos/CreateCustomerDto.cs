using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDtos
{
    public class CreateCustomerDto
    {
        [Required]
        public string CustomerName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string DriverLicense { get; set; }
        [Required]
        public string Address { get; set; }

    }
}