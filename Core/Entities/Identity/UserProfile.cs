
namespace Core.Entities.Identity
{
    public class UserProfile : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdentificationNumber { get; set; }
        public string DriverLicense { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}