using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Fuel: BaseEntity
    {
        public string FuelName { get; set; }
        public ICollection<Vehicle> Vehicles { get; set; }
    }
}