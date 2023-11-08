
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class VehicleWithAllSpecification : BaseSpecification<Vehicle>
    {
        public VehicleWithAllSpecification()
        {
            AddInclude(v => v.Brand);
            AddInclude(v => v.Model);
            AddInclude(v => v.Fuel);
            AddInclude(v => v.Status);
            AddInclude(v => v.Insurance);
            AddInclude(v => v.VehicleType);
            AddInclude(v => v.Reservations);
        }

        public VehicleWithAllSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(v => v.Brand);
            AddInclude(v => v.Model);
            AddInclude(v => v.Fuel);
            AddInclude(v => v.Status);
            AddInclude(v => v.Insurance);
            AddInclude(v => v.VehicleType);
            AddInclude(v => v.Reservations);
        }
    }
}