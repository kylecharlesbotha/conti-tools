using Application.Todos.Queries.GetPaginatedListOfTodos;
using Domain.Entities;

namespace Application.Common.Interfaces;

public interface ITodoQueryMapper
{
    public  TodoDto MapToDto(Todo todo);
}
