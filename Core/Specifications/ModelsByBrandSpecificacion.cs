using Core.Entities;

namespace Core.Specifications
{
    public class ModelsByBrandSpecificacion : BaseSpecification<Model>
    {
        public ModelsByBrandSpecificacion(int id, bool getByBrandId = false)
        : base(a => getByBrandId ? a.BrandId == id : a.Id == id)
        {
            AddInclude(a => a.Brand);
        }
    }
}