using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.ModelsDtos
{
    public class CreateModelDto
    {
        [Required]
        public string ModelName { get; set; }

        [Required]
        public int BrandId { get; set; }
    }
}