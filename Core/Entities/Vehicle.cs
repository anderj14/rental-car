
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
        public string Color { get; set; }
        public decimal RentalPrice { get; set; }
        public int FuelConsumption { get; set; }

        public int FuelId { get; set; }
        public Fuel Fuel { get; set; }

        public int BrandId { get; set; }
        public Brand Brand { get; set; }

        public int ModelId { get; set; }
        public Model Model { get; set; }

        public VehicleStatus Status { get; set; } = VehicleStatus.Available;

        public int VehicleTypeId { get; set; }
        public VehicleType VehicleType { get; set; }

        private readonly List<Photo> _photos = new List<Photo>();
        public IReadOnlyList<Photo> Photos => _photos.AsReadOnly();

        public void AddPhoto(string pictureUrl, string fileName, bool isMain = false)
        {
            var photo = new Photo
            {
                FileName = fileName,
                PictureUrl = pictureUrl
            };

            if (_photos.Count == 0) photo.IsMain = true;

            _photos.Add(photo);
        }

        public void RemovePhoto(int id)
        {
            var photo = _photos.Find(x => x.Id == id);
            _photos.Remove(photo);
        }

        public void SetMainPhoto(int id)
        {
            var currentMain = _photos.SingleOrDefault(item => item.IsMain);
            foreach (var item in _photos.Where(item => item.IsMain))
            {
                item.IsMain = false;
            }

            var photo = _photos.Find(x => x.Id == id);
            if (photo != null)
            {
                photo.IsMain = true;
                if (currentMain != null) currentMain.IsMain = false;
            }
        }
    }
}