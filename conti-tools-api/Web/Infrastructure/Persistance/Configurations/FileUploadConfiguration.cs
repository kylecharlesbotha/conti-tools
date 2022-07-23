using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class FileUploadConfiguration : IEntityTypeConfiguration<FileUpload>
{
    public void Configure(EntityTypeBuilder<FileUpload> builder)
    {
    }
}
