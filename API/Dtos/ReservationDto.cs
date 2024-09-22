
namespace Core.Dtos
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public string ReservationNumber { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Days { get; set; }
        public decimal RentalCost { get; set; }

        public string Customer { get; set; }
        public string Vehicle { get; set; }
        public string Insurance { get; set; }

        public string Status { get; set; }

    }
}