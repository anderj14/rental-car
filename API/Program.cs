using API.Extensions;
using API.Middleware;
using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();

// Use the extensions for cleaning the program class
builder.Services.AddApplicationServices(builder.Configuration);

// Added extensions Identity
builder.Services.AddIdentityServices(builder.Configuration); // Identity


builder.Services.AddSwaggerDocumentation(); //Swagger extensions

var app = builder.Build();

// Use the Middleware for servererror (2)
app.UseMiddleware<ExceptionMiddleware>();

// Admin the error, Example {{url}}/api/endpointthatdoesnotexist (1)
app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseSwaggerDocumentation(); //Swagger extensions

// For the pics
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Content")),
    RequestPath = "/Content"
});

app.UseCors("CorsPolicy");

app.UseAuthentication(); // Identity
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToController("Index", "FallBack");

app.UseDefaultFiles();
app.UseStaticFiles();

// For migrate the data
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<RentalContext>();
// var identityContext = services.GetRequiredService<AppIdentityDbContext>(); // Identity


var logger = services.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
    // await identityContext.Database.MigrateAsync(); // Identity
    await RentalContextSeed.SeedAsync(context);

    var userManager = services.GetRequiredService<UserManager<AppUser>>(); // Identity
    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
    var identityContext = services.GetRequiredService<AppIdentityDbContext>();
    await identityContext.Database.MigrateAsync();
    await AppIdentityDbContextSeed.SeedUsersAsync(userManager, roleManager);

    // await AppIdentityDbContextSeed.SeedUsersAsync(userManager); // Identity
}
catch (Exception ex)
{
    logger.LogError(ex, "An error ocurring during migration");
}


app.Run();
