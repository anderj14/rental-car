using API.Dtos;
using API.Dtos.CreateDtos;
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
        private readonly IUnitOfWork _unitOfWork;

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper,
            IPasswordHasher<AppUser> passwordHasher,
            IUnitOfWork unitOfWork
            )
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _unitOfWork = unitOfWork;
        }

        protected async Task<AppUser> GetAuthenticatedUserAsync()
        {
            return await _userManager.FindUserByEmailFromClaimPrincipal(User);
        }

        [Authorize]
        // [HttpGet("currentuser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await GetAuthenticatedUserAsync();

            if (user == null)
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated"));
            }

            return Ok(new
            {
                user.Email,
                Token = await _tokenService.CreateToken(user),
                user.UserName
            });
        }

        [Authorize]
        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExitsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
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

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await _userManager.FindUserByEmailWithAddressByClaimsPrincipalAsync(HttpContext.User);

            return _mapper.Map<AddressDto>(user.Address);
        }

        [Authorize]
        [HttpPost("address")]
        public async Task<ActionResult<AddressDto>> CreateUserAddress([FromBody] CreateAddressDto createAddressDto)
        {
            if (!ModelState.IsValid) return BadRequest(new ApiResponse(400, "Invalid Model"));

            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated"));
                }

                var existingAddress = await _unitOfWork.Repository<Address>().GetByConditionAsync(up => up.AppUserId == user.Id);

                if (existingAddress != null)
                {
                    return BadRequest(new ApiResponse(400, "Address already exists"));
                }


                var createAddress = _mapper.Map<CreateAddressDto, Address>(createAddressDto);
                createAddress.AppUserId = user.Id;

                _unitOfWork.Repository<Address>().Add(createAddress);
                await _unitOfWork.Complete();

                var data = _mapper.Map<AddressDto>(createAddress);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}, Inner exception: {ex.InnerException?.Message}");
            }
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(CreateAddressDto updateAddressDto)
        {
            if (!ModelState.IsValid) return BadRequest(new ApiResponse(400, "Invalid Model"));
            try
            {
                var user = await _userManager.FindUserByEmailWithAddressByClaimsPrincipalAsync(HttpContext.User);

                user.Address = _mapper.Map<CreateAddressDto, Address>(updateAddressDto);

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

                return BadRequest("Problem updating the user...");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}, Inner exception: {ex.InnerException?.Message}");
            }
        }

        [Authorize]
        [HttpGet("userprofile")]
        public async Task<ActionResult<UserProfileDto>> GetUserProfile()
        {
            var user = await _userManager.FindUserByEmailWithProfileByClaimsPrincipalAsync(HttpContext.User);

            return _mapper.Map<UserProfileDto>(user.UserProfile);
        }

        [Authorize]
        [HttpPost("userprofile")]
        public async Task<ActionResult<UserProfileDto>> CreateUserProfile(CreateUserProfileDto createUserProfileDto)
        {
            if (!ModelState.IsValid) return BadRequest(new ApiResponse(400, "Invalid Model"));

            try
            {
                var user = await GetAuthenticatedUserAsync();
                if (user == null) return Unauthorized(new ApiResponse(401, "User not authenticated"));

                var existingUserProfile = await _unitOfWork.Repository<UserProfile>().GetByConditionAsync(up => up.AppUserId == user.Id);

                if (existingUserProfile != null)
                {
                    return BadRequest(new ApiResponse(400, "User profile already exists"));
                }

                var createUserProfile = _mapper.Map<CreateUserProfileDto, UserProfile>(createUserProfileDto);
                createUserProfile.AppUserId = user.Id;

                _unitOfWork.Repository<UserProfile>().Add(createUserProfile);
                await _unitOfWork.Complete();

                var data = _mapper.Map<UserProfileDto>(createUserProfile);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}, Inner exception: {ex.InnerException?.Message}");
            }
        }

        [Authorize]
        [HttpPut("userprofile")]
        public async Task<ActionResult<UserProfileDto>> UpdateUserProfile(CreateUserProfileDto updateUserProfileDto)
        {
            if (!ModelState.IsValid) return BadRequest(new ApiResponse(400, "Invalid Model"));
            try
            {
                var user = await _userManager.FindUserByEmailWithProfileByClaimsPrincipalAsync(HttpContext.User);

                user.UserProfile = _mapper.Map<CreateUserProfileDto, UserProfile>(updateUserProfileDto);

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded) return Ok(_mapper.Map<UserProfile, UserProfileDto>(user.UserProfile));

                return BadRequest("Problem updating the user...");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}, Inner exception: {ex.InnerException?.Message}");
            }
        }


        [Authorize]
        [HttpPut("update")]
        public async Task<ActionResult<UserDto>> Update(RegisterDto registerDto)
        {

            var user = await GetAuthenticatedUserAsync();

            if (user == null)
            {
                return NotFound(new ApiResponse(404));
            }

            user.UserName = registerDto.UserName;
            user.Email = registerDto.Email;
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