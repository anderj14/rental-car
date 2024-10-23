
using Core.Entities;

namespace Core.Specifications
{
    public class VehicleSpecParams
    {
        private const int MaxPageSize = 1000;
        public int PageIndex { get; set; } = 1;

        private int _pageSize = 1000;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public int? BrandId { get; set; }
        public int? ModelId { get; set; }
        public VehicleStatus? Status { get; set; }
        public int? FuelId { get; set; }
        public int? VehicleTypeId { get; set; }
        
        public string? Sort { get; set; }

        private string _search;
        public string? Search
        {
            get => _search;
            set => _search = value.ToLower();
        }
    }
}