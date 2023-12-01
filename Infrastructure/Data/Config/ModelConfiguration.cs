
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ModelConfiguration : IEntityTypeConfiguration<Model>
    {
        public void Configure(EntityTypeBuilder<Model> builder)
        {
            builder.Property(m => m.Id).IsRequired();
            builder.Property(m => m.ModelName).IsRequired();

            builder.HasOne(i => i.Brand).WithMany()
                .HasForeignKey(i => i.BrandId);
        }
    }
}