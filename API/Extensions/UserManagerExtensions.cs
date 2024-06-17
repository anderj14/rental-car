
using System.Security.Claims;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindUserByClaimsPrincipeWithAddressAsync(
            this UserManager<AppUser> userManager, ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);

            return await userManager.Users.Include(x => x.Address)
                .SingleOrDefaultAsync(x => x.Email == email);
        }

        public static async Task<AppUser> FindByEmailFromClaimPrincipal(
            this UserManager<AppUser> userManager, ClaimsPrincipal user)
        {
            return await userManager.Users.SingleOrDefaultAsync(x => x.Email == user.FindFirstValue(ClaimTypes.Email));
        }

        // public static async Task<AppUser> SearchUserAsync(this UserManager<AppUser> userManager, 
        // ClaimsPrincipal user)
        // {
        //     var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

        //     var usuario = await userManager.Users.SingleOrDefaultAsync(x => x.Email == email);

        //     return usuario;
        // }
    }
}