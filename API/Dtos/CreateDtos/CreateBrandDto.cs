using System.ComponentModel.DataAnnotations;

namespace API.Dtos.CreateDtos
{
    public class CreateBrandDto
    {
        [Required]
        public string BrandName { get; set; }

    }
}