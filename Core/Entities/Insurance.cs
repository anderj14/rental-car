using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Insurance: BaseEntity
    {
        public string InsuranceName { get; set; }
        public decimal InsurancePrice { get; set; }

        public ICollection<Vehicle> Vehicles { get; set; }
    }
}