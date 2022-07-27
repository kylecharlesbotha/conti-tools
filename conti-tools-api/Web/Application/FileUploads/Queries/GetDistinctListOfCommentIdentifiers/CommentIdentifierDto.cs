namespace Application.FileUploads.Queries.GetDistinctListOfCommentIdentifiers;

public class CommentIdentifierDto
{
    public Guid FileUploadId { get; set; }
    public string CommentIdentifier { get; set; }
} 
