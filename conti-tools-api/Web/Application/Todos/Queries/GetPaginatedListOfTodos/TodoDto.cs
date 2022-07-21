namespace Application.Todos.Queries.GetPaginatedListOfTodos;

public class TodoDto
{
    public string Title { get; set; }
    public string Body { get; set; }
    public bool IsDone { get; set; }
}
