
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
        public string Status { get; set; }
        public string Insurance { get; set; }

        public VehicleDto Vehicle { get; set; }

        public string AppUserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string Phone { get; set; }
        public string IdentificationNumber { get; set; }
        public string DriverLicense { get; set; }

        // Datos de la dirección
        public string FirstAddress { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }

    }
}