
using System.ComponentModel.DataAnnotations;

namespace API.Dtos.CreateDtos
{
    public class CreateUserProfileDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string IdentificationNumber { get; set; }
        [Required]
        public string DriverLicense { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
    }
}