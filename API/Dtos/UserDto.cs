
using API.Dtos;

namespace Core.Dtos
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }

        public UserProfileDto UserProfile { get; set; }
        public AddressDto Address { get; set; }
    }
}