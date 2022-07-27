using Application.Common.Extensions;
using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.BackorderReports.Queries.GetPaginatedListOfBackorderReports;

public class GetPaginatedListOfBackorderReportsQuery : PaginatedQuery, IRequest<PaginatedList<BackorderReportDto>>
{
    public string? SalesDocSearch { get; set; } = string.Empty;
    public string? PoNumberSearch { get; set; } = string.Empty;
    public string? MaterialDescriptionSearch { get; set; } = string.Empty;
    public Guid? CommentIdentifierSearch { get; set; }
}

public class GetPaginatedListOfBackorderReportsQueryHandler : IRequestHandler<GetPaginatedListOfBackorderReportsQuery,
    PaginatedList<BackorderReportDto>>
{
    private readonly IContinentalToolsDbContext _context;
    private readonly ILogger<GetPaginatedListOfBackorderReportsQueryHandler> _logger;
    private readonly IBackorderReportsQueryMapper _mapper;

    public GetPaginatedListOfBackorderReportsQueryHandler(IContinentalToolsDbContext context,
        ILogger<GetPaginatedListOfBackorderReportsQueryHandler> logger, IBackorderReportsQueryMapper mapper)
    {
        _context = context;
        _logger = logger;
        _mapper = mapper;
    }

    public async Task<PaginatedList<BackorderReportDto>> Handle(GetPaginatedListOfBackorderReportsQuery request, CancellationToken cancellationToken)
    {
        return await _context.ReportRecords.FilterBySalesDoc(request.SalesDocSearch).FilterByPoNumber(request.PoNumberSearch)
            .FilterByMaterialDescription(request.MaterialDescriptionSearch).FilterByCommentIdentifier(request.CommentIdentifierSearch)
            .ToPaginatedListAsync(request.Page, request.PageSize, _mapper.MapToDto);
    }
}
