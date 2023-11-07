using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Customer: BaseEntity
    {
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string DriverLicense { get; set; }
        public string Address { get; set; }

        public ICollection<Reservation> Reservations { get; set; }
        public ICollection<Invoice> Invoices { get; set; }

    }
}