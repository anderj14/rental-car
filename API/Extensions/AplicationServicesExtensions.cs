
using System.Text;
using API.Errors;
using Core.Entities.Identity;
using Core.Interfaces;
using Infraestructure.Data;
using Infrastructure.Data;
using Infrastructure.Data.Repository;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class AplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services, IConfiguration config)
        {

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

            services.AddDbContext<RentalContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            // var builder = services.AddIdentityCore<AppUser>();
            // builder = new IdentityBuilder(builder.UserType, typeof(AppRole), builder.Services);
            // builder.AddSignInManager<SignInManager<AppUser>>();
            // builder.AddRoleValidator<RoleValidator<AppRole>>();
            // builder.AddRoleManager<RoleManager<AppRole>>();
            services.AddIdentity<AppUser, IdentityRole>(opt =>
               {
                   opt.User.RequireUniqueEmail = true;
                   opt.Password.RequireDigit = true;
                   opt.Password.RequireLowercase = true;
                   opt.Password.RequireUppercase = true;
                   opt.Password.RequireNonAlphanumeric = true;
                   opt.Password.RequiredLength = 8;
               })
               .AddEntityFrameworkStores<RentalContext>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    var tokenKey = config["Token:Key"];
                    var tokenIssuer = config["Token:Issuer"];
                    if (string.IsNullOrEmpty(tokenKey))
                    {
                        throw new ArgumentNullException(nameof(tokenKey), "Token key must be provided in configuration.");
                    }

                    if (string.IsNullOrEmpty(tokenIssuer))
                    {
                        throw new ArgumentNullException(nameof(tokenIssuer), "Token issuer must be provided in configuration.");
                    }


                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
                        ValidIssuer = tokenIssuer,
                        ValidateIssuer = true,
                        ValidateAudience = false
                    };
                });

            services.AddAuthentication();
            services.AddAuthorization();


            services.AddScoped<IPhotoService, PhotoService>();

            services.AddScoped<ITokenService, TokenService>(); // Identity

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            // Message for validation error
            // Configure the behavior of the API by configuring 'ApiBehaviorOptions'
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState // Validation errors that have occurred in the request are collected
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse // Which will contain the information of the validation errors of the model.
                    {
                        Errors = errors
                    };

                    return new BadRequestObjectResult(errorResponse);
                };
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });

            return services;
        }
    }
}