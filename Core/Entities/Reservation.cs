
namespace Core.Entities
{
    public class Reservation : BaseEntity
    {
        private static int _reservationCounter = 1;

        public Reservation()
        {
            ReservationNumber = GenerateReservationNumber();
        }

        public string ReservationNumber { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Days { get; set; }
        public decimal RentalCost { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }

        public int InsuranceId { get; set; }
        public Insurance Insurance { get; set; }

        private string GenerateReservationNumber()
        {
            string letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string randomLetters = new string(Enumerable.Repeat(letters, 3)
                .Select(s => s[new Random().Next(s.Length)]).ToArray());

            return $"{DateTime.Now:yyyyMMdd}-{randomLetters}-{_reservationCounter++}";
        }
    }
}