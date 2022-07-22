import { TablePagination } from '@mui/material';

interface TableFooterProps {
  rowCount: number;
  page: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
}

export const TableFooter = ({
  rowCount,
  pageSize,
  page,
  handlePageChange,
  handlePageSizeChange
}: TableFooterProps) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25, 50]}
      component="div"
      count={rowCount}
      rowsPerPage={pageSize}
      page={page}
      onPageChange={(event, page) => handlePageChange(page)}
      onRowsPerPageChange={(event) =>
        handlePageSizeChange(parseInt(event.target.value, 10))
      }
      showFirstButton
      showLastButton
    />
  );
};
