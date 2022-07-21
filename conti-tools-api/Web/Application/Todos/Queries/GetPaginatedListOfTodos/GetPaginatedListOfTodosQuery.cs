using Application.Common.Extensions;
using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using Microsoft.Extensions.Logging;
namespace Application.Todos.Queries.GetPaginatedListOfTodos;

public class GetPaginatedListOfTodosQuery : PaginatedQuery, IRequest<PaginatedList<TodoDto>>
{
    public override string ToString()
    {
        return $"Page: {Page}, pageSize: {PageSize}";
    }
}

public class GetPaginatedListOfTodosQueryHandler : IRequestHandler<GetPaginatedListOfTodosQuery, PaginatedList<TodoDto>>
{
    private readonly IContinentalToolsDbContext _context;
    private readonly ITodoQueryMapper _mapper;
    private readonly ILogger<GetPaginatedListOfTodosQueryHandler> _logger;

    public GetPaginatedListOfTodosQueryHandler(IContinentalToolsDbContext context, ITodoQueryMapper mapper, ILogger<GetPaginatedListOfTodosQueryHandler> logger)
    {
        _context = context;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<PaginatedList<TodoDto>> Handle(GetPaginatedListOfTodosQuery request, CancellationToken cancellationToken)
    {
        return await _context.Todos.ToPaginatedListAsync(request.Page, request.PageSize, _mapper.MapToDto);
    }
}
