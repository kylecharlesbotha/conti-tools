using Application.BackorderReports.Commands.CreateBackOrderReportsCommand;
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
        GetTodoWithPagination(CreateBackOrderReportsCommand query)
    {
        _logger.LogInformation(query.ToString());
        return await Mediator.Send(query);
    }
}
