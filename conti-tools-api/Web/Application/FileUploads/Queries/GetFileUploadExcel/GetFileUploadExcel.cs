using System.Text.RegularExpressions;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;

namespace Application.FileUploads.Queries.GetFileUploadExcel;

public class GetFileUploadExcel : IRequest<ExcelFileDto>
{
    public Guid FileUploadId { get; set; }
}

public class GetFileUploadExcelHandler : IRequestHandler<GetFileUploadExcel, ExcelFileDto>
{
    private readonly IContinentalToolsDbContext _context;

    public GetFileUploadExcelHandler(IContinentalToolsDbContext context)
    {
        _context = context;
    }

    public async Task<ExcelFileDto> Handle(GetFileUploadExcel request, CancellationToken cancellationToken)
    {
        var fileUpload = await _context.FileUploads.FindAsync(request.FileUploadId);
        
        if (fileUpload == null)
        {
            throw new FileNotFoundException(); 
        }
        var result = Regex.Replace(fileUpload.FileData, @"^data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", string.Empty);
        var fileBytes = Convert.FromBase64String(result);

        return new ExcelFileDto
        {
            FileName = fileUpload.FileName,
            FileData = fileBytes
        }; 
    }
}
