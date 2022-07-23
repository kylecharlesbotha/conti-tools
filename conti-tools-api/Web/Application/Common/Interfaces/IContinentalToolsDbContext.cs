using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces;

public interface IContinentalToolsDbContext
{
    DbSet<Todo> Todos { get; } 
    DbSet<FileUpload> FileUploads { get; }
    DbSet<ReportRecord> ReportRecords { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
