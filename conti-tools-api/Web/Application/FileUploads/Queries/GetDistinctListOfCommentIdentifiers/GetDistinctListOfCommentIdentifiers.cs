using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.FileUploads.Queries.GetDistinctListOfCommentIdentifiers;

public class GetDistinctListOfCommentIdentifiers : IRequest<List<CommentIdentifierDto>>
{
    
}

public class GetDistinctListOfCommentIdentifiersHandler : IRequestHandler<GetDistinctListOfCommentIdentifiers, List<CommentIdentifierDto>>
{

    private readonly IContinentalToolsDbContext _context;
    private readonly IFileUploadsQueryMapper _mapper;

    public GetDistinctListOfCommentIdentifiersHandler(IContinentalToolsDbContext context, IFileUploadsQueryMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<CommentIdentifierDto>> Handle(GetDistinctListOfCommentIdentifiers request, CancellationToken cancellationToken)
    {
        return _context.FileUploads.Select(_mapper.MapToCommentIdentifierDto).ToList(); 
    }
}
