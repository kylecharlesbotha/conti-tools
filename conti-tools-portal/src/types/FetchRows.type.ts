import { PaginatedResponse } from './api/PaginatedResponse.type';
import { Request } from 'src/types';

export type FetchRows<T> = (
  queryParams: Request
) => Promise<PaginatedResponse<T>>;
