using Domain.Common;

namespace Domain.Entities;

public class Todo : AuditableEntity
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public bool IsDone { get; set; }
}
