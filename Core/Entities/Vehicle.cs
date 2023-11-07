
namespace Core.Entities
{
    public class Vehicle : BaseEntity
    {
        public string VehicleName { get; set; }
        public int Year { get; set; }
        public string Vin { get; set; }
        public int Passengers { get; set; }
        public string Transmission { get; set; }
        public int Doors { get; set; }
        
        public int FuelConsumption { get; set; }
        public int FuelId { get; set; }
        public Fuel Fuel { get; set; }
        public decimal RentalPrice { get; set; }
        public string Picture { get; set; }

        public int BrandId { get; set; }
        public Brand Brand { get; set; }

        public int ModelId { get; set; }
        public Model Model { get; set; }

        public int InsuranseId { get; set; }
        public Insurance Insurance { get; set; }

        public int VehicleTypeId { get; set; }
        public VehicleType VehicleType { get; set; }
        
        public ICollection<Reservation> Reservations { get; set; }

    }
}