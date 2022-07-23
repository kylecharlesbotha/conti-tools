namespace Domain.Entities;

public class ReportRecord
{
    public int ReportRecordId { get; set; }
    public Guid FileUploadId { get; set; }
    public string SalesDoc { get; set; }
    public DateTime PODate { get; set; }
    public string PurchaseOrderNo { get; set; } = string.Empty; 
    public int Item { get; set; } 
    public string Plant { get; set; } = string.Empty;
    public string MaterialDescription { get; set; }
    public string MaterialNumber { get; set; } = string.Empty;
    public int QtyOutst { get; set; } 
    public string CustomerInfo { get; set; } = string.Empty;
    public DateTime Reqdlvdt { get; set; } 
    public DateTime SchedLnDate { get; set; } 
    public int DaysLate { get; set; } 
    public string FifoQtyOnHand { get; set; } = string.Empty;
    public string ActualQtyOnHand { get; set; } = string.Empty;
    public string CustomerStock { get; set; } = string.Empty;
    public decimal OutstValue { get; set; }  
    public string Comments { get; set; } = string.Empty;
}
