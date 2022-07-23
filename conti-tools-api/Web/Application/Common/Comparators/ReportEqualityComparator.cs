using Domain.Entities;

namespace Application.Common.Comparators;

public class ReportQualityComparator: IEqualityComparer <ReportRecord >
{
    public bool Equals(ReportRecord x, ReportRecord y)
    {
        if (ReferenceEquals(x, y)) return true;
        if (ReferenceEquals(x, null)) return false;
        if (ReferenceEquals(y, null)) return false;
        if (x.GetType() != y.GetType()) return false;
        return x.SalesDoc == y.SalesDoc && x.PurchaseOrderNo == y.PurchaseOrderNo && x.MaterialDescription == y.MaterialDescription;
    }

    public int GetHashCode(ReportRecord obj)
    {
        return HashCode.Combine(obj.SalesDoc, obj.PurchaseOrderNo, obj.MaterialDescription);
    }
} 
