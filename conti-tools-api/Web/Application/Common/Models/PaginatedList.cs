using Microsoft.EntityFrameworkCore;

namespace Application.Common.Models;

public class PaginatedList<TResult>
{
    public List<TResult>? Items { get; }

    public int PageNumber { get; }

    public int TotalCount { get; }

    public int TotalPages { get; }

    public PaginatedList(List<TResult> items, int count, int pageNumber, int pageSize)
    {
        PageNumber = pageNumber;
        Items = items;
        TotalCount = count;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
    }

    public PaginatedList()
    {
    
    }

    public bool HasPreviousPage => PageNumber > 1;

    public bool HasNextPage => PageNumber < TotalPages;

    public static async Task<PaginatedList<TResult>> CreateAsync<T>(IQueryable<T> query, int pageNumber, int pageSize, Func<T, TResult> selector)
    {
        var count = await query.CountAsync();
        var skipCount = pageNumber * pageSize < count ? pageNumber * pageSize : 0;
        var items = await query.Skip(skipCount).Take(pageSize).ToListAsync();
        var mappedItems = items.Select(selector).ToList();
        return new PaginatedList<TResult>(mappedItems, count, pageNumber , pageSize);
    }
}
