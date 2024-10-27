
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
            builder.Property(r => r.ReservationNumber).IsRequired();
            builder.Property(r => r.StartDate).IsRequired();
            builder.Property(r => r.EndDate).IsRequired();
            builder.Property(r => r.Days).IsRequired();
            builder.Property(r => r.RentalCost).IsRequired().HasColumnType("decimal(18,2)");

            builder.Property(s => s.Status)
            .HasConversion(
                o => o.ToString(),
                o => (ReservationStatus)Enum.Parse(typeof(ReservationStatus), o)
            );


            builder.HasOne(u => u.AppUser)
            .WithMany(u => u.Reservations)
            .HasForeignKey(r => r.AppUserId);

            builder.HasOne(i => i.Insurance).WithMany()
                .HasForeignKey(i => i.InsuranceId);
        }
    }
}
