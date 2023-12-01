
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
    {
        public void Configure(EntityTypeBuilder<Invoice> builder)
        {
            builder.Property(i => i.Id).IsRequired();
            builder.Property(i => i.TotalAmount).IsRequired();
            builder.Property(i => i.Date).IsRequired();
            builder.Property(i => i.PaymentType).IsRequired();

            builder.HasOne(i => i.Customer).WithMany()
                .HasForeignKey(i => i.CustomerId);
            builder.HasOne(i => i.Reservation).WithMany()
                .HasForeignKey(i => i.ReservationId);
        }
    }
}