using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class VehicleType : BaseEntity
    {
        public string VehicleTypeName { get; set; }
        public ICollection<Vehicle> Vehicles { get; set; }

    }
}