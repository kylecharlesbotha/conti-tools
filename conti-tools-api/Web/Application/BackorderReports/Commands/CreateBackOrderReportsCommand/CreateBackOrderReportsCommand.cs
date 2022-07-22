using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.BackorderReports.Commands.CreateBackOrderReportsCommand;

public class CreateBackOrderReportsCommand : IRequest<int>
{
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

    public Task<int> Handle(CreateBackOrderReportsCommand request, CancellationToken cancellationToken)
    {
        string result = Regex.Replace(request.File, @"^data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", string.Empty);
        var fileBytes = Convert.FromBase64String(result);
        _logger.LogInformation(Newtonsoft.Json.JsonConvert.SerializeObject(fileBytes));
        return Task.FromResult(1);  
    }
}

