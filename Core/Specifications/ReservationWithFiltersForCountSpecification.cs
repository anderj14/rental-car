
using Core.Entities;

namespace Core.Specifications
{
    public class ReservationWithFiltersForCountSpecification : BaseSpecification<Reservation>
    {
        public ReservationWithFiltersForCountSpecification(ReservationSpecParams reservationSpecParams)
        : base(x =>
            string.IsNullOrEmpty(reservationSpecParams.Search) || x.Customer.CustomerName.ToLower().Contains(reservationSpecParams.Search) ||
            (string.IsNullOrEmpty(reservationSpecParams.Search) || x.ReservationNumber.ToLower().Contains(reservationSpecParams.Search)) &&
            (!reservationSpecParams.CustomerId.HasValue || x.CustomerId == reservationSpecParams.CustomerId) &&
            (!reservationSpecParams.VehicleId.HasValue || x.VehicleId == reservationSpecParams.VehicleId) &&
            (!reservationSpecParams.InsuranceId.HasValue || x.InsuranceId == reservationSpecParams.InsuranceId)
        )
        {
        }
    }
}