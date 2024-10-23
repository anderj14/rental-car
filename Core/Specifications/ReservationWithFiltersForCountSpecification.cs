
using Core.Entities;

namespace Core.Specifications
{
    public class ReservationWithFiltersForCountSpecification : BaseSpecification<Reservation>
    {
        public ReservationWithFiltersForCountSpecification(ReservationSpecParams reservationSpecParams)
        : base(x =>
            (string.IsNullOrEmpty(reservationSpecParams.Search) || x.AppUser.UserName.ToLower().Contains(reservationSpecParams.Search) ||
            x.ReservationNumber.ToLower().Contains(reservationSpecParams.Search)) &&
            (!reservationSpecParams.Status.HasValue || x.Status == reservationSpecParams.Status) &&
            (!reservationSpecParams.VehicleId.HasValue || x.VehicleId == reservationSpecParams.VehicleId) &&
            (!reservationSpecParams.InsuranceId.HasValue || x.InsuranceId == reservationSpecParams.InsuranceId)
        )
        {
        }
    }
}