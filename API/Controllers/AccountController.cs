using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Dtos;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<AppUser> _passwordHasher;

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper,
            IPasswordHasher<AppUser> passwordHasher
            )
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _passwordHasher = passwordHasher;

        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindUserByEmailFromClaimPrincipal(User);

            return new UserDto()
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                UserName = user.UserName
            };
        }

        [Authorize]
        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExitsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await _userManager.FindUserByEmailWithAddressByClaimsPrincipalAsync(HttpContext.User);

            return _mapper.Map<Address, AddressDto>(user.Address);
        }
        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await _userManager.FindUserByEmailWithAddressByClaimsPrincipalAsync(HttpContext.User);

            user.Address = _mapper.Map<AddressDto, Address>(address);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

            return BadRequest("Problem updating the user...");

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            //finding a user
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized(new ApiResponse(401));

            // Success or not
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto()
            {
                Id = user.Id,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                UserName = user.UserName
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (CheckEmailExitsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse
                {
                    Errors = new[] { "Email address is in use" }
                });
            }

            var user = new AppUser
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400));

            var roleAddResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleAddResult.Succeeded) return BadRequest("Failed to add to role");

            return new UserDto
            {
                UserName = user.UserName,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email
            };
        }

        [HttpPut("update")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserDto>> Update(RegisterDto registerDto)
        {

            var user = await _userManager.FindByEmailAsync(registerDto.Email);

            if (user == null)
            {
                return NotFound(new ApiResponse(404));
            }

            user.UserName = registerDto.UserName;
            user.PasswordHash = _passwordHasher.HashPassword(user, registerDto.Password);

            if (!string.IsNullOrEmpty(registerDto.Password))
            {
                user.PasswordHash = _passwordHasher.HashPassword(user, registerDto.Password);
            }

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user)
            };
        }

        [HttpGet("users")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ICollection<UserDto>>> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            var userDtos = _mapper.Map<IEnumerable<AppUser>, IEnumerable<UserDto>>(users);

            return Ok(userDtos);
        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound(new ApiResponse(404));
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(new ApiResponse(400));
            }

            return Ok();
        }
    }
}