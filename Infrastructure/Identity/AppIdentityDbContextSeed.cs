
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Andder",
                    Email = "andder@test.com",
                    UserName = "andder@test.com",
                    Address = new Address
                    {
                        FirstName = "Andder",
                        LastName = "Frias",
                        City = "New Yersey",
                        ZipCode = "07031"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$0rd");
            }
        }
    }
}