using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class ReportRecordConfiguration : IEntityTypeConfiguration<ReportRecord>
{
    public void Configure(EntityTypeBuilder<ReportRecord> builder)
    {
    }
}
