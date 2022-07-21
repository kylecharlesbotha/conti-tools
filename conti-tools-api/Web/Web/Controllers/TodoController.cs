using Application.Common.Models;
using Application.Todos.Commands.CreateTodo;
using Application.Todos.Queries.GetPaginatedListOfTodos;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

public class TodosController : ApiControllerBase
{
    private readonly ILogger<TodosController> _logger;

    public TodosController(ILogger<TodosController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Retrieves a single todo
    /// </summary>
    /// <param name="query"></param>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<PaginatedList<TodoDto>>>
        GetTodoWithPagination([FromQuery] GetPaginatedListOfTodosQuery query)
    {
        _logger.LogInformation(query.ToString());
        return await Mediator.Send(query);
    }

    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateTodoCommand command)
    {
        return await Mediator.Send(command);
    }
}
