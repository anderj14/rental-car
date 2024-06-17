using System.ComponentModel.DataAnnotations;

namespace API.Dtos.CreateDtos
{
    public class CreateStatusDto
    {
        [Required]
        public string StatusName { get; set; }
    }
}