
namespace Core.Entities.Identity
{
    public class Address : BaseEntity
    {
        public string FirstAddress { get; set; }
        public string SecondAddress { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }

        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}