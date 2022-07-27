using Application.Common.Interfaces;
using Application.FileUploads.Queries.GetDistinctListOfCommentIdentifiers;
using Application.FileUploads.Queries.GetPaginatedListOfFileUploads;
using Domain.Entities;

namespace Application.Common.Mappers;

public class FileUploadsQueryMapper : IFileUploadsQueryMapper
{
    public FileUploadDto MapToDto(FileUpload fileUpload)
    {
        return new FileUploadDto
        {
            FileUploadId = fileUpload.FileUploadId, 
            FileName = fileUpload.FileName,
            CommentIdentifier = fileUpload.CommentIdentifier,
            DateUploaded = fileUpload.DateUploaded
        };
    }

    public CommentIdentifierDto MapToCommentIdentifierDto(FileUpload fileUpload)
    {
        return new CommentIdentifierDto
        {
            FileUploadId = fileUpload.FileUploadId,
            CommentIdentifier = fileUpload.CommentIdentifier
        }; 
    }
}
