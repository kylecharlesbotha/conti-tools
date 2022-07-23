using System.Text.RegularExpressions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;
using OfficeOpenXml;

namespace Application.BackorderReports.Commands.CreateBackOrderReportsCommand;

public class CreateBackOrderReportsCommand : IRequest<int>
{
    public string FileName { get; set; }
    public string CommentIdentifier { get; set; }
    public string File { get; set; }
}

public class CreateBackOrderReportsCommandHandler : IRequestHandler<CreateBackOrderReportsCommand, int>
{
    private readonly IContinentalToolsDbContext _context;
    private readonly ILogger<CreateBackOrderReportsCommandHandler> _logger;

    public CreateBackOrderReportsCommandHandler(IContinentalToolsDbContext context, ILogger<CreateBackOrderReportsCommandHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<int> Handle(CreateBackOrderReportsCommand request, CancellationToken cancellationToken)
    {
        string result = Regex.Replace(request.File, @"^data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", string.Empty);
        var fileBytes = Convert.FromBase64String(result);
        
        //TODO Update this so that filename is guid? 
        await File.WriteAllBytesAsync(request.FileName, fileBytes, cancellationToken);
        
        FileInfo existingFile = new FileInfo(request.FileName);
        using (ExcelPackage package = new ExcelPackage(existingFile))
        {
            ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
            int rowCount = worksheet.Dimension.End.Row; 
            
            var fileUpload = new FileUpload
            {
                CommentIdentifier = request.CommentIdentifier,
                FileName = request.FileName,
                FileData = request.File,
                DateUploaded = DateTime.Now
            }; 
            for (int row = 3; row <= rowCount; row++)
            {
                fileUpload.ReportRecords.Add(new ReportRecord
                {
                    SalesDoc = worksheet.Cells[row, 1].Value?.ToString().Trim(),
                    PODate = worksheet.Cells[row, 2].Value?.ToString().Trim(),
                    PurchaseOrderNo = worksheet.Cells[row, 3].Value?.ToString().Trim(),
                    Item = worksheet.Cells[row, 4].Value?.ToString().Trim(),
                    Plant = worksheet.Cells[row, 5].Value?.ToString().Trim(),
                    MaterialDescription = worksheet.Cells[row, 6].Value?.ToString().Trim(),
                    MaterialNumber = worksheet.Cells[row, 7].Value?.ToString().Trim(),
                    QtyOutst = worksheet.Cells[row, 8].Value?.ToString().Trim(),
                    CustomerInfo = worksheet.Cells[row, 9].Value?.ToString().Trim(),
                    Reqdlvdt = worksheet.Cells[row, 10].Value?.ToString().Trim(),
                    SchedLnDate = worksheet.Cells[row, 11].Value?.ToString().Trim(),
                    DaysLate = worksheet.Cells[row, 12].Value?.ToString().Trim(),
                    FifoQtyOnHand = worksheet.Cells[row, 13].Value?.ToString().Trim(),
                    ActualQtyOnHand = worksheet.Cells[row, 14].Value?.ToString().Trim(),
                    CustomerStock = worksheet.Cells[row, 15].Value?.ToString().Trim(),
                    OutstValue = worksheet.Cells[row, 16].Value?.ToString().Trim(),
                    Comments = worksheet.Cells[row, 17].Value?.ToString().Trim()
                });
            }
            _context.FileUploads.Add(fileUpload);
        }
        
        File.Delete(request.FileName);
        
        return await _context.SaveChangesAsync(cancellationToken); 
    }
     
}

