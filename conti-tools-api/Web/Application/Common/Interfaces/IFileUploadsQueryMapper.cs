using Application.Common.Models;
using Application.FileUploads.Queries.GetPaginatedListOfFileUploads;
using Domain.Entities;

namespace Application.Common.Interfaces;

public interface IFileUploadsQueryMapper
{
    public FileUploadDto MapToDto(FileUpload fileUpload);
}
