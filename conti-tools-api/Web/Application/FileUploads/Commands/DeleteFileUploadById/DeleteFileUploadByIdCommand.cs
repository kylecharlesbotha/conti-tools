using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;

namespace Application.FileUploads.Commands.DeleteFileUploadById;

public class DeleteFileUploadByIdCommand : IRequest<int>
{
    public Guid FileUploadId { get; set; }
}

public class DeleteFileUploadByIdCommandHandler : IRequestHandler<DeleteFileUploadByIdCommand, int>
{
    private readonly IContinentalToolsDbContext _context;

    public DeleteFileUploadByIdCommandHandler(IContinentalToolsDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(DeleteFileUploadByIdCommand request, CancellationToken cancellationToken)
    {
        var fileUpload = await _context.FileUploads.FindAsync(request.FileUploadId);

        if (fileUpload == null)
        {
            throw new NotFoundException(); 
        }

        _context.FileUploads.Remove(fileUpload);

        return await _context.SaveChangesAsync(cancellationToken); 
    }
}
