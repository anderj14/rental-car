
using Core.Entities;

namespace Core.Specifications
{
    public class CustomerWithDetailsSpecification : BaseSpecification<Customer>
    {
        public CustomerWithDetailsSpecification(CustomerSpecParams customerSpecParams)
        : base(x =>
            string.IsNullOrEmpty(customerSpecParams.Search) || x.CustomerName.ToLower().Contains
            (customerSpecParams.Search)
        )
        {
        }
    }
}