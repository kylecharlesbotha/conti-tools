namespace Application.FileUploads.Queries.GetPaginatedListOfFileUploads;

public class FileUploadDto
{
    public Guid FileUploadId { get; set; }
    public string FileName { get; set; }
    public string CommentIdentifier { get; set; }
    public DateTime DateUploaded { get; set; }
} 
