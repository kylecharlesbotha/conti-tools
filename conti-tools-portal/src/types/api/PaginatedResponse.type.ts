export type PaginatedResponse<T> = {
  items: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pageNumber: number;
  totalCount: number;
  totalPages: number;
};
