using Application.BackorderReports.Queries.GetPaginatedListOfBackorderReports;
using Application.Common.Interfaces;
using Domain.Entities;

namespace Application.Common.Mappers;

public class BackorderReportsQueryMapper : IBackorderReportsQueryMapper
{
    public BackorderReportDto MapToDto(ReportRecord reportRecord)
    {
        return new BackorderReportDto
        {
            Id = reportRecord.ReportRecordId,
            SalesDoc = reportRecord.SalesDoc,
            PODate = reportRecord.PODate,
            PurchaseOrderNo = reportRecord.PurchaseOrderNo,
            MaterialDescription = reportRecord.MaterialDescription,
            QtyOutstanding = reportRecord.QtyOutst,
            ReqDlvDt = reportRecord.Reqdlvdt,
            SchedLnDate = reportRecord.SchedLnDate,
            OutstValue = reportRecord.OutstValue,
            AberdareComments = reportRecord.Comments,
            ContiComments = reportRecord.ContiComments
        };

    }
} 
