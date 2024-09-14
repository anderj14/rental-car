
using Core.Entities.Identity;

namespace Core.Entities
{
    public class Reservation : BaseEntity
    {
        private static int _reservationCounter = 1;

        public Reservation()
        {
            ReservationNumber = GenerateReservationNumber();
            ReservationStatusId = 1;
        }

        public void ValidateDates()
        {
            if (EndDate <= StartDate)
            {
                throw new ArgumentException("EndDate must be after StartDate.");
            }
        }

        public string ReservationNumber { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Days { get; set; }
        public decimal RentalCost { get; set; }

        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }

        public int InsuranceId { get; set; }
        public Insurance Insurance { get; set; }

        public int ReservationStatusId { get; set; }
        public ReservationStatus ReservationStatus { get; set; }

        private string GenerateReservationNumber()
        {
            string letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string randomLetters = new string(Enumerable.Repeat(letters, 3)
                .Select(s => s[new Random().Next(s.Length)]).ToArray());

            return $"{DateTime.Now:yyyyMMdd}-{randomLetters}-{_reservationCounter++}";
        }

        public void CalculateDays()
        {
            ValidateDates();
            Days = (EndDate - StartDate).Days;
        }

        public void CalculateRentalCost()
        {
            ValidateDates();

            var rentalDays = Math.Max((EndDate - StartDate).Days, 1);
            RentalCost = rentalDays * Vehicle.RentalPrice;

            if (Insurance != null)
            {
                RentalCost += Insurance.InsurancePrice;
            }
        }
    }
}