using System.Dynamic;
using Application.BackorderReports.Commands.CreateBackOrderReportsCommand;
using Application.BackorderReports.Queries.GetCombinedReportQuery;
using Application.Common.Models;
using Application.FileUploads.Commands.DeleteFileUploadById;
using Application.FileUploads.Queries.GetDistinctListOfCommentIdentifiers;
using Application.FileUploads.Queries.GetFileUploadExcel;
using Application.FileUploads.Queries.GetPaginatedListOfFileUploads;
using Application.Todos.Commands.CreateTodo;
using Application.Todos.Queries.GetPaginatedListOfTodos;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

public class FileUploadsController : ApiControllerBase
{
    private readonly ILogger<FileUploadsController> _logger;

    public FileUploadsController(ILogger<FileUploadsController> logger)
    {
        _logger = logger;
    }


    /// <summary>
    /// Gets a paginated list of file uploads
    /// </summary>
    /// <param name="query"></param>
    /// <returns></returns>
    [HttpGet]
    public async Task<PaginatedList<FileUploadDto>>
        GetPaginatedListOfFileUploads([FromQuery] GetPaginatedListOfFileUploadsQuery query)
    {
        return await Mediator.Send(query);
    }

    /// <summary>
    /// Gets a distinct list of all comment identifiers
    /// </summary>
    /// <returns></returns>
    [HttpGet("commentIdentifiers/distinct")]
    public async Task<List<CommentIdentifierDto>>
        GetDistinctCommentIdentifier()
    {
        return await Mediator.Send(new GetDistinctListOfCommentIdentifiers());
    }

    /// <summary>
    /// Deletes a file upload in the system
    /// </summary>
    /// <param name="fileUploadId"></param>
    /// <returns></returns>
    [HttpDelete]
    public async Task<int>
        DeleteFileUpload([FromQuery] Guid fileUploadId)
    {
        return await Mediator.Send(new DeleteFileUploadByIdCommand
        {
            FileUploadId = fileUploadId
        });
    }
    
    /// <summary>
    /// Gets a file upload by id
    /// </summary>
    /// <param name="fileUploadId"></param>
    /// <returns></returns>
    [HttpGet("download")]
    public async Task<FileResult>
        GetFileUplaodExcel([FromQuery] Guid fileUploadId)
    {
        var fileDto =  await Mediator.Send(new GetFileUploadExcel
        {
            FileUploadId = fileUploadId
        });
        return File(fileDto.FileData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileDownloadName: fileDto.FileName);
    }

    
}
