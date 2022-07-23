using System.Dynamic;
using Application.BackorderReports.Commands.CreateBackOrderReportsCommand;
using Application.BackorderReports.Queries.GetCombinedReportQuery;
using Application.Common.Models;
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
}
