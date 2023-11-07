using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Reservation : BaseEntity
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal RentalCost { get; set; }
        public string Status { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }

        public ICollection<Invoice> Invoices { get; set; }

    }
}