
using Core.Entities;

namespace Core.Specifications
{
    public class InvoiceWithDetailsSpecification : BaseSpecification<Invoice>
    {
        public InvoiceWithDetailsSpecification(InvoiceSpecParams invoiceSpecParams)
            : base(x =>
                string.IsNullOrEmpty(invoiceSpecParams.Search) || x.Customer.CustomerName.ToLower().Contains(invoiceSpecParams.Search) ||
                (string.IsNullOrEmpty(invoiceSpecParams.Search) || x.Reservation.ReservationNumber.ToLower().Contains(invoiceSpecParams.Search)) &&
                (!invoiceSpecParams.CustomerId.HasValue || x.CustomerId == invoiceSpecParams.CustomerId) &&
                (!invoiceSpecParams.ReservationId.HasValue || x.ReservationId == invoiceSpecParams.ReservationId)
            )
        {
            AddInclude(i => i.Customer);
            AddInclude(i => i.Reservation);


            ApplyPaging(invoiceSpecParams.PageSize * (invoiceSpecParams.PageIndex - 1), invoiceSpecParams.PageSize);

            if (!string.IsNullOrEmpty(invoiceSpecParams.Sort))
            {
                switch (invoiceSpecParams.Sort)
                {
                    case "dateAsc":
                        AddOrderBy(p => p.Date);
                        break;
                    case "dateDesc":
                        AddOrderByDescending(p => p.Date);
                        break;
                    default:
                        AddOrderBy(i => i.Customer.CustomerName);
                        break;
                }
            }
        }

        public InvoiceWithDetailsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(i => i.Customer);
            AddInclude(i => i.Reservation);
        }
    }
}
