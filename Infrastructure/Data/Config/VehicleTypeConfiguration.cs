
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class VehicleTypeConfiguration : IEntityTypeConfiguration<VehicleType>
    {
        public void Configure(EntityTypeBuilder<VehicleType> builder)
        {
            builder.Property(vt => vt.Id).IsRequired();
            builder.Property(vt => vt.VehicleTypeName).IsRequired().HasMaxLength(50);
        }
    }
}