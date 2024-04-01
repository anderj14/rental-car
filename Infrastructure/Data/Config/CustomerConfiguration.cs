using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.Property(c => c.Id).IsRequired();
            builder.Property(c => c.CustomerName).IsRequired().HasMaxLength(100);
            builder.Property(c => c.Email).IsRequired().HasMaxLength(70);
            builder.Property(c => c.Phone).IsRequired();
            builder.Property(c => c.DriverLicense).IsRequired();
            builder.Property(c => c.Address).IsRequired();
            builder.Property(c => c.DOB).IsRequired();
            builder.Property(c => c.SecondAddress).HasMaxLength(100);
            builder.Property(c => c.City).HasMaxLength(50);
            builder.Property(c => c.State).HasMaxLength(50);
            builder.Property(c => c.Zip).HasMaxLength(20);
            builder.Property(c => c.Country).HasMaxLength(50);

            builder.HasMany(c => c.Reservations)
               .WithOne(r => r.Customer)
               .HasForeignKey(r => r.CustomerId)
               .OnDelete(DeleteBehavior.Cascade);
        }
    }
}