
namespace Infrastructure.Data
{
    public class VehicleSeedModel
    {
        public int Id { get; set; }
        public string VehicleName { get; set; }
        public int Year { get; set; }
        public string Vin { get; set; }
        public int Passengers { get; set; }
        public string Transmission { get; set; }
        public int Doors { get; set; }
        public string Color { get; set; }
        public decimal RentalPrice { get; set; }
        public int FuelConsumption { get; set; }
        public string PictureUrl { get; set; }

        public int FuelId { get; set; }

        public int BrandId { get; set; }

        public int ModelId { get; set; }

        public int StatusId { get; set; }

        public int VehicleTypeId { get; set; }
    }
}