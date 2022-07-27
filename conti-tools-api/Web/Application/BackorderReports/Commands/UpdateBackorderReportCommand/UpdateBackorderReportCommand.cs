using Application.Common.Interfaces;
using MediatR;

namespace Application.BackorderReports.Commands.UpdateBackorderReportCommand;

public class UpdateBackorderReportCommand : IRequest<int>
{
    public int Id { get; set; }
    public string SalesDoc { get; set; } 
    public DateTime PoDate { get; set; }
    public string PurchaseOrderNo { get; set; }
    public string MaterialDescription { get; set; }
    public int QtyOutstanding { get; set; }
    public DateTime ReqDlvDt { get; set; }
    public DateTime SchedLnDate { get; set; }
    public decimal OutstValue { get; set; }
    public string AberdareComments { get; set; }
    public string ContiComments { get; set; }
}

public class UpdateBackorderReportCommandHandler : IRequestHandler<UpdateBackorderReportCommand, int>
{

    private readonly IContinentalToolsDbContext _context;

    public UpdateBackorderReportCommandHandler(IContinentalToolsDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateBackorderReportCommand request, CancellationToken cancellationToken)
    {
        var record = await _context.ReportRecords.FindAsync(request.Id);

        record.SalesDoc = request.SalesDoc;
        record.PODate = request.PoDate;
        record.PurchaseOrderNo = request.PurchaseOrderNo;
        record.MaterialDescription = request.MaterialDescription;
        record.QtyOutst = request.QtyOutstanding;
        record.Reqdlvdt = request.ReqDlvDt;
        record.SchedLnDate = request.SchedLnDate;
        record.OutstValue = request.OutstValue;
        record.Comments = request.AberdareComments;
        record.ContiComments = request.ContiComments;

        _context.ReportRecords.Update(record);

        return await _context.SaveChangesAsync(cancellationToken); 
    }
}
