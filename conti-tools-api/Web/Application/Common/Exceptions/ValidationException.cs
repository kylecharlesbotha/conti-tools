using FluentValidation.Results;

namespace Application.Common.Exceptions;

public class ValidationException : Exception
{
    public IDictionary<string, string[]> Errors { get; }
    public ValidationException() : base("One or more validation errors occurred")
    {
        Errors = new Dictionary<string, string[]>();
    }
  
    public ValidationException(string propertyName, string errorMessage) : this()
    {
        Errors = new Dictionary<string, string[]>(){
            { propertyName, new string[]{ errorMessage } }
        };
    }
    public ValidationException(string propertyName, string[] errorMessage) : this()
    {
        Errors = new Dictionary<string, string[]>(){
            { propertyName, errorMessage }
        };
    }
  
    public ValidationException(IEnumerable<ValidationFailure> failures) : this()
    {
        if (failures.Any(failure => failure.FormattedMessagePlaceholderValues.ContainsKey("CollectionIndex")))
        {
            Errors = failures
                .OrderBy(failure => (int)failure.FormattedMessagePlaceholderValues["CollectionIndex"])
                .Select(failure =>
                {
                    var rowIndex = (int)failure.FormattedMessagePlaceholderValues["CollectionIndex"];
                    var propertyName = (string)failure.FormattedMessagePlaceholderValues["PropertyName"];
                    return KeyValuePair.Create($"Row {rowIndex + 1}", failure.ErrorMessage);
                })
                .GroupBy(failure => failure.Key, failure => failure.Value)
                .ToDictionary(failure => failure.Key, failure => failure.ToArray());
        }
        else
        {
            Errors = failures
                .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
                .ToDictionary(failureGroup => failureGroup.Key, failureGroup => failureGroup.ToArray());
        }
    }
}
