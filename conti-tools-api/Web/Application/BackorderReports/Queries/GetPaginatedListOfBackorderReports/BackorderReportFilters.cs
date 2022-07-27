using System.Linq;
using Domain.Entities;

namespace Application.BackorderReports.Queries.GetPaginatedListOfBackorderReports;

public static class BackorderReportFilters
{
    public static IQueryable<ReportRecord> FilterBySalesDoc(this IQueryable<ReportRecord> query, string? salesDocSearch)
    {
        if (string.IsNullOrEmpty(salesDocSearch))
        {
            return query;
        }

        return query.Where(x =>
            x.SalesDoc.Contains(salesDocSearch.Trim()));
    }
    
    public static IQueryable<ReportRecord> FilterByPoNumber(this IQueryable<ReportRecord> query, string? poNumberSearch)
    {
        if (string.IsNullOrEmpty(poNumberSearch))
        {
            return query;
        }

        return query.Where(x =>
            x.PurchaseOrderNo.Contains(poNumberSearch.Trim()));
    }
    
    public static IQueryable<ReportRecord> FilterByMaterialDescription(this IQueryable<ReportRecord> query, string? materialDescriptionSearch)
    {
        if (string.IsNullOrEmpty(materialDescriptionSearch))
        {
            return query;
        }

        return query.Where(x =>
            x.MaterialDescription.Contains(materialDescriptionSearch.Trim()));
    }
    
    public static IQueryable<ReportRecord> FilterByCommentIdentifier(this IQueryable<ReportRecord> query, Guid? commentIdentifier)
    {
        if (commentIdentifier == null)
        {
            return query;
        }

        return query.Where(x =>
            x.FileUploadId == commentIdentifier);
    }
}
