namespace Application.BackorderReports.Queries.GetPaginatedListOfBackorderReports;

public class BackorderReportDto
{
    public int Id { get; set; }
    public string SalesDoc { get; set; }
    public DateTime PODate { get; set; }
    public string PurchaseOrderNo { get; set; } = string.Empty;
    public string MaterialDescription { get; set; }
    public int QtyOutstanding { get; set; }
    public DateTime ReqDlvDt { get; set; }
    public DateTime SchedLnDate { get; set; }
    public decimal OutstValue { get; set; }
    public string AberdareComments { get; set; } = string.Empty;
    public string ContiComments { get; set; } = string.Empty;
}

