
using Core.Entities.Identity;

namespace Core.Specifications
{
    public class UserWithSpecification : BaseSpecification<AppUser>
    {
        public UserWithSpecification(UserSpecParams userSpecParams)
        : base(x =>
         string.IsNullOrEmpty(userSpecParams.Search) || x.UserName.ToLower().Contains(userSpecParams.Search))
        {
            AddOrderBy(x => x.UserName);
        }
    }
}