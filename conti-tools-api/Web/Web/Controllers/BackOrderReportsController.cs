using System.Dynamic;
using Application.BackorderReports.Commands.CreateBackOrderReportsCommand;
using Application.BackorderReports.Queries.GetCombinedReportQuery;
using Application.Common.Models;
using Application.Todos.Commands.CreateTodo;
using Application.Todos.Queries.GetPaginatedListOfTodos;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

public class BackorderReportsController : ApiControllerBase
{
    private readonly ILogger<BackorderReportsController> _logger;

    public BackorderReportsController(ILogger<BackorderReportsController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Creates a single backorder report
    /// </summary>
    /// <param name="query"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<int>
        CreateBackorderReport(CreateBackOrderReportsCommand command)
    {
        _logger.LogInformation(command.ToString());
        return await Mediator.Send(command);
    }

    /// <summary>
    /// Gets a report of combined results
    /// </summary>
    /// <param name="query"></param>
    /// <returns></returns>
    [HttpGet]
    public async Task<FileResult>
        GetCombinedBackorderReport()
    {
        var result =  await Mediator.Send(new GetCombinedReportQuery());
        var fileName = $"{DateTime.Now.ToString("yyyy-MM-dd")}_generated-report.XLSX";
        return File(result, "application/octet-stream", fileDownloadName: fileName);
    }
}
