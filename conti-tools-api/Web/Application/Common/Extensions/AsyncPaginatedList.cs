using Application.Common.Models;

namespace Application.Common.Extensions;

public static class AsyncPaginatedList
{
    public static Task<PaginatedList<TResult>> ToPaginatedListAsync<T, TResult>(this IQueryable<T> query, int pageNumber, int pageSize, Func<T, TResult> selector) =>
        PaginatedList<TResult>.CreateAsync(query, pageNumber, pageSize, selector);
}
