using API.Extensions;
using API.Middleware;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();

// Use the extensions for cleaning the program class
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Use the Middleware for servererror (2)
app.UseMiddleware<ExceptionMiddleware>();

// Admin the error, Example {{url}}/api/endpointthatdoesnotexist (1)
app.UseStatusCodePagesWithReExecute("/errors/{0}");

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

// For the pic
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<RentalContext>();
var logger = services.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
    await RentalContextSeed.SeedAsync(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "An error ocurring during migration");
}


app.Run();
