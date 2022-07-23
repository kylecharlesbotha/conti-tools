using Application.Common.Extensions;
using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.FileUploads.Queries.GetPaginatedListOfFileUploads;

public class GetPaginatedListOfFileUploadsQuery : PaginatedQuery, IRequest<PaginatedList<FileUploadDto>>
{
    
}

public class GetPaginatedListOfFileUploadsHandler : IRequestHandler<GetPaginatedListOfFileUploadsQuery, PaginatedList<FileUploadDto>>
{
    private readonly IContinentalToolsDbContext _context;
    private readonly ILogger<GetPaginatedListOfFileUploadsHandler> _logger;
    private readonly IFileUploadsQueryMapper _mapper;

    public GetPaginatedListOfFileUploadsHandler(IContinentalToolsDbContext context, ILogger<GetPaginatedListOfFileUploadsHandler> logger, IFileUploadsQueryMapper mapper)
    {
        _context = context;
        _logger = logger;
        _mapper = mapper;
    }

    public async Task<PaginatedList<FileUploadDto>> Handle(GetPaginatedListOfFileUploadsQuery request, CancellationToken cancellationToken)
    {
        return  await _context.FileUploads.ToPaginatedListAsync(request.Page, request.PageSize, _mapper.MapToDto);
    }
}
