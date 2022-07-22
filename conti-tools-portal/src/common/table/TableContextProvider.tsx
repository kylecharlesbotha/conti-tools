import { SortDirection } from '@mui/material';
import { createContext, useContext, FC } from 'react';
import { useTableQueryParams } from './hooks';

interface TableContextInterface {
  disableSort?: boolean;
  order: SortDirection;
  orderBy: string;
  handleRequestSort: (
    property: string
  ) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  page: number;
  handlePageChange: (page: number) => void;
  pageSize: number;
  handlePageSizeChange: (pageSize: number) => void;
}

interface DefaultProviderProps {
  disableSort?: boolean;
}

const TableContext = createContext<TableContextInterface | undefined>(
  undefined
);

export const TableContextProvider: FC<DefaultProviderProps> = ({
  disableSort,
  children
}) => {
  const {
    order,
    setOrder,
    orderBy,
    setOrderBy,
    page,
    handlePageChange,
    pageSize,
    handlePageSizeChange
  } = useTableQueryParams({ defaultPageSize: 10, disableSort });

  const handleRequestSort =
    (property: string) =>
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

  const startingValue: TableContextInterface = {
    disableSort,
    handleRequestSort,
    order,
    orderBy,
    page,
    handlePageChange,
    pageSize,
    handlePageSizeChange
  };

  return (
    <TableContext.Provider value={startingValue}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const tableContext = useContext(TableContext);

  if (!tableContext) {
    throw new Error(
      'Cannot use Table Context outside of Table Context Provider'
    );
  }

  return tableContext;
};
