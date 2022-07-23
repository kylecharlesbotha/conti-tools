using Application.Common.Interfaces;
using Domain.Common;
using Domain.Entities;
using Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class ContinentalToolsDbContext : DbContext, IContinentalToolsDbContext
{
    public ContinentalToolsDbContext(DbContextOptions<ContinentalToolsDbContext> options) : base(options)
    { }

    public DbSet<Todo> Todos => Set<Todo>();
    public DbSet<FileUpload> FileUploads => Set<FileUpload>(); 
    public DbSet<ReportRecord> ReportRecords => Set<ReportRecord>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new TodoConfiguration());
        modelBuilder.ApplyConfiguration(new FileUploadConfiguration());
        modelBuilder.ApplyConfiguration(new ReportRecordConfiguration());

        base.OnModelCreating(modelBuilder);
    }
    
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedBy = 0;
                    entry.Entity.CreatedAt = DateTime.Now;
                    entry.Entity.UpdatedBy = 0;
                    entry.Entity.UpdatedAt = DateTime.Now;
                    break;

                case EntityState.Modified:
                    entry.Entity.UpdatedBy = 0;
                    entry.Entity.UpdatedAt = DateTime.Now;
                    break;

                case EntityState.Deleted:
                    entry.Entity.UpdatedBy = 0;
                    entry.Entity.UpdatedAt = DateTime.Now;
                    entry.Entity.IsDeleted = true;
                    break;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}
