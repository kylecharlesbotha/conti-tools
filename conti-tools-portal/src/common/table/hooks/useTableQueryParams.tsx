import { SortDirection } from '@mui/material';
import {
  useQueryParams,
  withDefault,
  StringParam,
  NumberParam
} from 'use-query-params';

const OrderParam = {
  encode: (order: SortDirection) => order as string,
  decode: (
    order: string | null | undefined | (string | null)[]
  ): SortDirection =>
    typeof order === 'string' ? (order as SortDirection) : 'asc'
};

interface DefaultQueryParams {
  defaultPageSize: number;
  disableSort?: boolean;
}

export const useTableQueryParams = ({
  defaultPageSize,
  disableSort = false
}: DefaultQueryParams) => {
  const [query, setQuery] = useQueryParams({
    order: OrderParam,
    orderBy: withDefault(StringParam, ''),
    page: withDefault(NumberParam, 0),
    pageSize: withDefault(NumberParam, defaultPageSize),
    search: StringParam
  });

  const { order, orderBy, page, pageSize, search } = query;

  const setOrder = (order: SortDirection) => {
    if (!disableSort) {
      setQuery({ order }, 'replaceIn');
    }
  };

  const setOrderBy = (orderBy: string) => {
    if (!disableSort) {
      setQuery({ orderBy }, 'replaceIn');
    }
  };

  const setPage = (page: number) => setQuery({ page }, 'replaceIn');
  const setPageSize = (pageSize: number) => setQuery({ pageSize }, 'replaceIn');

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
    setPage(0);
  };

  const setSearch = (search: string) => setQuery({ search }, 'replaceIn');

  return {
    order,
    setOrder,
    orderBy,
    setOrderBy,
    page,
    handlePageChange,
    pageSize,
    handlePageSizeChange,
    search,
    setSearch
  };
};
