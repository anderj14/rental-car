
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ReservationConfiguration : IEntityTypeConfiguration<Reservation>
    {
        public void Configure(EntityTypeBuilder<Reservation> builder)
        {
            builder.Property(r => r.Id).IsRequired();
            builder.Property(r => r.StartDate).IsRequired();
            builder.Property(r => r.EndDate).IsRequired();
            builder.Property(r => r.Days).IsRequired();
            builder.Property(r => r.RentalCost).IsRequired().HasColumnType("decimal(18,2)");

            builder.HasOne(r => r.Customer).WithMany()
                .HasForeignKey(r => r.CustomerId);

            builder.HasOne(r => r.Vehicle).WithMany()
                .HasForeignKey(r => r.VehicleId);

            builder.HasOne(i => i.Insurance).WithMany()
                .HasForeignKey(i => i.InsuranceId);
        }
    }
}
