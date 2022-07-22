import { Box, Table as MuiTable, TableContainer } from '@mui/material';
import { useEffect, useState } from 'react';
import { TableFooter, TableHeader, TableBody } from '.';
import { useTableContext } from './TableContextProvider';
import { TableRowData } from 'src/types';
import { FetchRows } from 'src/types/FetchRows.type';

interface ITable {
  headers: { id: string; label: string }[];
  fetchRows: FetchRows<TableRowData>;
  search?: string;
  filters?: Record<string, string>;
}

export const Table = ({ headers, fetchRows, search, filters }: ITable) => {
  const [currentRows, setCurrentRows] = useState<TableRowData[]>([]);
  const [totalRows, setTotalRows] = useState(0);

  const {
    order,
    orderBy,
    handlePageChange,
    handlePageSizeChange,
    handleRequestSort,
    page,
    pageSize
  } = useTableContext();

  useEffect(() => {
    (async () => {
      const paginatedResponse = await fetchRows({
        page,
        pageSize,
        order: order as string,
        orderBy,
        search,
        filters
      });

      setTotalRows(paginatedResponse.totalCount);
      setCurrentRows([...paginatedResponse.items]);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, order, orderBy, search, filters]);

  return (
    <Box mt={2}>
      <TableContainer>
        <MuiTable>
          <TableHeader
            headers={headers}
            order={order}
            orderBy={orderBy}
            handleSort={handleRequestSort}
          />
          <TableBody rows={currentRows} headers={headers} />
        </MuiTable>
      </TableContainer>
      <TableFooter
        rowCount={totalRows}
        pageSize={pageSize}
        page={page}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </Box>
  );
};
