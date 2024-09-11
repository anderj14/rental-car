
using Core.Entities;

namespace Core.Specifications
{
    public class ReservationWithDetailsSpecification : BaseSpecification<Reservation>
    {
        public ReservationWithDetailsSpecification(ReservationSpecParams reservationSpecParams)
        : base(x =>
            string.IsNullOrEmpty(reservationSpecParams.Search) || x.AppUser.UserName.ToLower().Contains(reservationSpecParams.Search) ||
            (string.IsNullOrEmpty(reservationSpecParams.Search) || x.ReservationNumber.ToLower().Contains(reservationSpecParams.Search)) &&
            (!reservationSpecParams.VehicleId.HasValue || x.VehicleId == reservationSpecParams.VehicleId) &&
            (!reservationSpecParams.InsuranceId.HasValue || x.InsuranceId == reservationSpecParams.InsuranceId)
        )
        {
            AddInclude(r => r.AppUser);
            AddInclude(r => r.Vehicle);
            AddInclude(r => r.Insurance);
            AddOrderBy(x => x.ReservationNumber);

            ApplyPaging(reservationSpecParams.PageSize * (reservationSpecParams.PageIndex - 1), reservationSpecParams.PageSize);

            if (!string.IsNullOrEmpty(reservationSpecParams.Sort))
            {
                switch (reservationSpecParams.Sort)
                {
                    case "dateAsc":
                        AddOrderBy(p => p.StartDate);
                        break;
                    case "dateDesc":
                        AddOrderByDescending(p => p.StartDate);
                        break;
                    default:
                        AddOrderBy(r => r.ReservationNumber);
                        break;
                }
            }
        }
        public ReservationWithDetailsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(r => r.AppUser);
            AddInclude(r => r.Vehicle);
            AddInclude(r => r.Insurance);
        }
    }
}