using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Todos.Commands.CreateTodo;

public class CreateTodoCommand : IRequest<int>
{
    public string Title { get; set; }
    public string Body { get; set; }
    public bool IsDone { get; set; }
}

public class CeateTodoCommandHandler : IRequestHandler<CreateTodoCommand, int>
{
    private readonly ILogger<CeateTodoCommandHandler> _logger;
    private readonly IContinentalToolsDbContext _context;

    public CeateTodoCommandHandler(ILogger<CeateTodoCommandHandler> logger, IContinentalToolsDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task<int> Handle(CreateTodoCommand request, CancellationToken cancellationToken)
    {
        var entity = new Todo
        {
            Title = request.Title,
            Body = request.Body,
            IsDone = request.IsDone
        };

        _context.Todos.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
