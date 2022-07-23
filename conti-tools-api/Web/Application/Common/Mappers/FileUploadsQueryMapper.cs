using Application.Common.Interfaces;
using Application.FileUploads.Queries.GetPaginatedListOfFileUploads;
using Domain.Entities;

namespace Application.Common.Mappers;

public class FileUploadsQueryMapper : IFileUploadsQueryMapper
{
    public FileUploadDto MapToDto(FileUpload fileUpload)
    {
        return new FileUploadDto
        {
            FileName = fileUpload.FileName,
            CommentIdentifier = fileUpload.CommentIdentifier,
            DateUploaded = fileUpload.DateUploaded
        };
    }
}
