
using Core.Entities;

namespace Core.Specifications
{
    public class ReservationSpecParams
    {
        private const int MaxPageSize = 50;

        public int PageIndex { get; set; } = 1;

        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public int? VehicleId { get; set; }
        public int? InsuranceId { get; set; }
        public ReservationStatus? Status { get; set; }

        public string? Sort { get; set; }

        private string _search = string.Empty;
        public string? Search
        {
            get => _search;
            set => _search = value.ToLower();
        }
    }
}