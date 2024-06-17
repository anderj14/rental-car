using System.ComponentModel.DataAnnotations;

namespace API.Dtos.CreateDtos
{
    public class CreateInsuranceDto
    {
        [Required]
        public string InsuranceName { get; set; }
        [Required]
        public decimal InsurancePrice { get; set; }
    }
}