using Application.Common.Interfaces;
using Application.Todos.Queries.GetPaginatedListOfTodos;
using Domain.Entities;

namespace Application.Common.Mappers;

public class TodoQueryMapper : ITodoQueryMapper
{
    public TodoDto MapToDto(Todo todo)
    {
        return new TodoDto
        {
            Title = todo.Title,
            Body = todo.Body,
            IsDone = todo.IsDone
        };
    }
}
