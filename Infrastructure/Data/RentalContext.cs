using System.Reflection;
using Core.Entities;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class RentalContext : IdentityDbContext<AppUser>
    {
        public RentalContext(DbContextOptions<RentalContext> options) : base(options)
        {
        }

        public DbSet<Brand> Brands { get; set; }
        public DbSet<Fuel> Fuels { get; set; }
        public DbSet<Insurance> Insurances { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<VehicleType> VehicleTypes { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            // configures the conversion of properties from type decimal to double.
            if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                // This loop iterates through all entities.
                foreach (var entityType in modelBuilder.Model.GetEntityTypes())
                {
                    // All decimal type properties are obtained for the current entity.
                    var properties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));
                    // This loop iterates through the decimal type properties found in the entity.
                    foreach (var property in properties)
                    {
                        // Configure the conversion of the identified decimal property to double
                        modelBuilder.Entity(entityType.Name).Property(property.Name)
                        .HasConversion<double>();
                    }
                }
            }
        }
    }
}