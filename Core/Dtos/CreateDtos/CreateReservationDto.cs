

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
        public int Days { get; set; }
        [Required]
        [RegularExpression(@"^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$",
            ErrorMessage = "Price must be a decimal (e.g 20.30)")]
        public decimal RentalCost { get; set; }

        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int VehicleId { get; set; }
        [Required]
        public int InsuranceId { get; set; }
    }
}