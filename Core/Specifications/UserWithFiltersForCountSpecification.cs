
using Core.Entities.Identity;

namespace Core.Specifications
{
    public class UserWithFiltersForCountSpecification : BaseSpecification<AppUser>
    {
        public UserWithFiltersForCountSpecification(UserSpecParams userSpecParams)
        : base(x =>
         string.IsNullOrEmpty(userSpecParams.Search) || x.UserName.ToLower().Contains(userSpecParams.Search))
        {
            AddOrderBy(x => x.UserName);
        }
    }
}