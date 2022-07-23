using System.Dynamic;
using System.Reflection;
using System.Reflection.Emit;
using Application.Common.ClassGeneration;
using Application.Common.Comparators;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OfficeOpenXml;


namespace Application.BackorderReports.Queries.GetCombinedReportQuery;

public class GetCombinedReportQuery : IRequest<byte[]>
{
}

public class GetCombinedReportQueryHandler : IRequestHandler<GetCombinedReportQuery, byte[]>
{
    private readonly IContinentalToolsDbContext _context;
    private readonly ILogger<GetCombinedReportQuery> _logger;

    public GetCombinedReportQueryHandler(IContinentalToolsDbContext context, ILogger<GetCombinedReportQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<byte[]> Handle(GetCombinedReportQuery request, CancellationToken cancellationToken)
    {
        var contiCommentsName = " Conti Comments"; 
        var aberdareCommentsName = " Aberdare Comments"; 
        var uploads = await _context.FileUploads.Include(fileUpload => fileUpload.ReportRecords).ToListAsync(cancellationToken: cancellationToken);

        var uploadsDictionary = new Dictionary<FileUpload, List<ReportRecord>>();

        IEnumerable<ReportRecord> unionedRecords = uploads[0].ReportRecords;

        for (int i = 1; i < uploads.Count; i++)
        {
            unionedRecords = unionedRecords.Union(uploads[i].ReportRecords, new ReportQualityComparator());
        }

        //get column names in string[]
        var propertyNames = typeof(ReportRecord).GetProperties().Select(p => p.Name).ToList();
        propertyNames.RemoveAll(u => u.StartsWith("Comments"));

        //get comment columns in string[] 
        var commentColumnNames = uploads.Select(upload => upload.CommentIdentifier).Distinct();
        foreach (var col in commentColumnNames)
        {
            propertyNames.Add(col + aberdareCommentsName);
            propertyNames.Add(col + contiCommentsName);
        }

        var commentColumnNamesArray = propertyNames.ToArray();
        var commentColTypesArray = new Type[propertyNames.Count];
        commentColTypesArray[0] = typeof(int);
        commentColTypesArray[1] = typeof(Guid);

        for (int i = 2; i < propertyNames.Count; i++)
        {
            commentColTypesArray[i] = typeof(string);
        }

        List<object?> customObjs = new List<object?>();

        for (int i = 0; i < unionedRecords.Count(); i++)
        {
            ClassGenerator MCB = new ClassGenerator(Guid.NewGuid().ToString());
            var combinedRecord = MCB.CreateObject(commentColumnNamesArray, commentColTypesArray);
            Type TP = combinedRecord.GetType();

            for (int j = 2; j < commentColumnNamesArray.Length; j++)
            {
                var record = unionedRecords.ElementAt(i);
                if (!commentColumnNamesArray[j].Contains("Comment"))
                {
                    PropertyInfo propInfo = combinedRecord.GetType().GetProperty(commentColumnNamesArray[j]);
                    propInfo.SetValue(combinedRecord,
                        Convert.ChangeType(record.GetType().GetProperty(commentColumnNamesArray[j]).GetValue(record, null),
                            propInfo.PropertyType), null);
                }
                
                foreach (var upload in uploads)
                {
                    var recordComment = upload.ReportRecords.Find(reportRecord =>
                        reportRecord.SalesDoc == record.SalesDoc && reportRecord.PurchaseOrderNo == record.PurchaseOrderNo &&
                        reportRecord.MaterialDescription == record.MaterialDescription)
                        ?.Comments; 
                    
                    PropertyInfo propInfo = combinedRecord.GetType().GetProperty(upload.CommentIdentifier + aberdareCommentsName);
                    propInfo.SetValue(combinedRecord,
                        Convert.ChangeType(recordComment,
                            propInfo.PropertyType), null);
                }
            }
            customObjs.Add(combinedRecord);
        }


        _logger.LogInformation(JsonConvert.SerializeObject(customObjs));

        dynamic obj = new ExpandoObject();
        obj.Report = unionedRecords;
        
        ExcelPackage ExcelPkg = new ExcelPackage();  
        ExcelWorksheet wsSheet1 = ExcelPkg.Workbook.Worksheets.Add("Sheet1");


        for (int i = 1; i < customObjs.Count; i++)
        {
            for (int j = 2; j < commentColumnNamesArray.Length; j++)
            {
                _logger.LogInformation(commentColumnNamesArray[j]);
                if (i == 1)
                {
                    wsSheet1.Cells[i, j - 1].Value = commentColumnNamesArray[j];
                    wsSheet1.Cells["A1:T1"].AutoFilter = true;
                    wsSheet1.Cells["A1:T1"].AutoFitColumns();
                }
                else
                {
                    var val = customObjs.ElementAt(i - 1).GetType().GetProperty(commentColumnNamesArray[j])
                        .GetValue(customObjs.ElementAt(i - 1), null);
                    wsSheet1.Cells[i, j - 1].Value = val;
                     
                }
            }
        }
        
        wsSheet1.Protection.IsProtected = false;  
        wsSheet1.Protection.AllowSelectLockedCells = false; 
        
        var stream = new MemoryStream(await ExcelPkg.GetAsByteArrayAsync(cancellationToken)).ToArray();

        return stream;
    }
}
