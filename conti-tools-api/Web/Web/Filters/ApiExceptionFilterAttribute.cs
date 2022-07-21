using Application.Common.Exceptions;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ValidationException = Application.Common.Exceptions.ValidationException;

namespace Web.Filters
{
  public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
  {
    private readonly IDictionary<Type, Action<ExceptionContext>> _exceptionHandlers;
    private readonly ILogger _logger;

    public ApiExceptionFilterAttribute(ILogger<ApiExceptionFilterAttribute> logger)
    {
      // Register known exception types and handlers.
      _exceptionHandlers = new Dictionary<Type, Action<ExceptionContext>>
            {
                { typeof(ValidationException), HandleValidationException }
            };
      _logger = logger;
    }

    public override void OnException(ExceptionContext context)
    {
      HandleException(context);
      base.OnException(context);
    }

    private void HandleException(ExceptionContext context)
    {
      Type type = context.Exception.GetType();
      if (_exceptionHandlers.ContainsKey(type))
      {
        _exceptionHandlers[type].Invoke(context);
        return;
      }

      if (!context.ModelState.IsValid)
      {
        HandleInvalidModelStateException(context);
        return;
      }

      HandleUnknownException(context);
    }


    private void HandleInvalidModelStateException(ExceptionContext context)
    {
      var details = new ValidationProblemDetails(context.ModelState);

      context.Result = new BadRequestObjectResult(details);

      context.ExceptionHandled = true;
    }

    private void HandleValidationException(ExceptionContext context)
    {
      var exception = (ValidationException)context.Exception;

      var details = new ValidationProblemDetails(exception.Errors);

      context.Result = new BadRequestObjectResult(details);

      context.ExceptionHandled = true;
    }

    private void HandleUnknownException(ExceptionContext context)
    {
      _logger.LogError(context.Exception, "An unhandled exception occurred");
      var details = new ProblemDetails
      {
        Status = StatusCodes.Status500InternalServerError,
        Title = "An error occurred while processing your request.",
        Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1"
      };

      context.Result = new ObjectResult(details)
      {
        StatusCode = StatusCodes.Status500InternalServerError
      };

      context.ExceptionHandled = true;
    }
  }
}
