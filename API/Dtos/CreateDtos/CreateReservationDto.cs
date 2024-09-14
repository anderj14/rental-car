

using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDtos
{
    public class CreateReservationDto
    {
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public int VehicleId { get; set; }
        [Required]
        public int InsuranceId { get; set; }
    }
}