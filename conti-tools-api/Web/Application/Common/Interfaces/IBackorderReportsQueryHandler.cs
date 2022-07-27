using Application.BackorderReports.Queries.GetPaginatedListOfBackorderReports;
using Domain.Entities;

namespace Application.Common.Interfaces;

public interface IBackorderReportsQueryMapper
{
    public BackorderReportDto MapToDto(ReportRecord reportRecord);
}
