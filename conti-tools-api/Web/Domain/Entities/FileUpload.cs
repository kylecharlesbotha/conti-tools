namespace Domain.Entities;

public class FileUpload
{
    public Guid FileUploadId { get; set; }
    public string CommentIdentifier { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string FileData { get; set; } = string.Empty; 
    public DateTime DateUploaded { get; set; }
    public List<ReportRecord> ReportRecords { get; set; } = new List<ReportRecord>(); 
}
