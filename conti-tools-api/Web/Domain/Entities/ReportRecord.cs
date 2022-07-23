namespace Domain.Entities;

public class ReportRecord
{
    public int ReportRecordId { get; set; }
    public Guid FileUploadId { get; set; }
    public string? SalesDoc { get; set; }
    public string? PODate { get; set; } = string.Empty;
    public string? PurchaseOrderNo { get; set; }
    public string? Item { get; set; } = string.Empty;
    public string? Plant { get; set; } = string.Empty;
    public string? MaterialDescription { get; set; }
    public string? MaterialNumber { get; set; } = string.Empty;
    public string? QtyOutst { get; set; } = string.Empty;
    public string? CustomerInfo { get; set; } = string.Empty;
    public string? Reqdlvdt { get; set; } = string.Empty;
    public string? SchedLnDate { get; set; } = string.Empty;
    public string? DaysLate { get; set; } = string.Empty;
    public string? FifoQtyOnHand { get; set; } = string.Empty;
    public string? ActualQtyOnHand { get; set; } = string.Empty;
    public string? CustomerStock { get; set; } = string.Empty;
    public string? OutstValue { get; set; } = string.Empty;
    public string? Comments { get; set; } = string.Empty;
}
