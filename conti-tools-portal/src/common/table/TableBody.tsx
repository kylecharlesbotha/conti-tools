import {
  CircularProgress,
  TableBody as MuiTableBody,
  TableCell,
  TableRow
} from '@mui/material';
import { get, set, uniq } from 'lodash';
import { TableHeaderConfig, TableRowData } from 'src/types';

interface TableBodyProps {
  rows?: TableRowData[];
  headers: TableHeaderConfig[];
}

const isString = (
  data: string | number | boolean | Date | JSX.Element
): data is string => typeof data === 'string';

export const TableBody = ({ rows, headers }: TableBodyProps) => {
  if (rows === undefined) {
    return (
      <MuiTableBody>
        <TableRow
          key={1}
          data-testid={`row-${1}`}
          sx={{ borderTop: '1pt solid #e0e0e0' }}
        >
          <TableCell colSpan={headers.length} align="center">
            <CircularProgress />
          </TableCell>
        </TableRow>
      </MuiTableBody>
    );
  }
  const groupedHeader = headers.find((header) => header.allowGrouping === true);
  const groupings = {};
  const spannedRows: string[] = [];
  if (groupedHeader) {
    const rowValuesToGroup = rows.map((row) => get(row, groupedHeader.id));
    const uniqueValues = uniq(rowValuesToGroup).filter(isString);
    uniqueValues.forEach((groupValue) => {
      const count = rowValuesToGroup.filter(
        (value) => value === groupValue
      ).length;
      set(groupings, groupValue, count);
    });
  }

  if (rows.length <= 0) {
    <MuiTableBody>
      <TableRow
        key={1}
        data-testid={`row-${1}`}
        sx={{ borderTop: '1pt solid #e0e0e0' }}
      >
        <TableCell colSpan={headers.length} align="center">
          No data to display
        </TableCell>
      </TableRow>
    </MuiTableBody>;
  } else if (rows.length > 0) {
    return (
      <MuiTableBody>
        {rows.map((row, rowIndex) => {
          const groupedHeaderValue = get(
            row,
            groupedHeader?.id ?? '',
            ''
          ) as string;
          const displayGroupedValue = !spannedRows.includes(groupedHeaderValue);

          if (groupedHeader && displayGroupedValue) {
            spannedRows.push(groupedHeaderValue);
          }

          return (
            <TableRow
              tabIndex={-1}
              key={rowIndex}
              data-testid={`row-${rowIndex}`}
            >
              {headers.map((header, cellIndex) => {
                const cellValue = get(row, header.id, '');
                const groupingSpan = header.allowGrouping
                  ? get(groupings, groupedHeaderValue, 1)
                  : 1;

                if (header.allowGrouping && !displayGroupedValue) {
                  return null;
                }

                return (
                  <TableCell
                    key={cellIndex}
                    component="th"
                    id={`row-${rowIndex}-cell-${header.id}`}
                    data-testid={`row-${rowIndex}-cell-${header.id}`}
                    scope="row"
                    padding="normal"
                    rowSpan={groupingSpan}
                    sx={{
                      ...(groupedHeader && header.allowGrouping
                        ? {
                            borderRight: 1,
                            borderColor: '#e0e0e0',
                            verticalAlign: 'top'
                          }
                        : {})
                    }}
                  >
                    {cellValue}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </MuiTableBody>
    );
  }
  return (
    <MuiTableBody>
      {rows.length > 0 ? (
        rows.map((row, rowIndex) => {
          const groupedHeaderValue = get(
            row,
            groupedHeader?.id ?? '',
            ''
          ) as string;
          const displayGroupedValue = !spannedRows.includes(groupedHeaderValue);

          if (groupedHeader && displayGroupedValue) {
            spannedRows.push(groupedHeaderValue);
          }

          return (
            <TableRow
              tabIndex={-1}
              key={rowIndex}
              data-testid={`row-${rowIndex}`}
            >
              {headers.map((header, cellIndex) => {
                const cellValue = get(row, header.id, '');
                const groupingSpan = header.allowGrouping
                  ? get(groupings, groupedHeaderValue, 1)
                  : 1;

                if (header.allowGrouping && !displayGroupedValue) {
                  return null;
                }

                return (
                  <TableCell
                    key={cellIndex}
                    component="th"
                    id={`row-${rowIndex}-cell-${header.id}`}
                    data-testid={`row-${rowIndex}-cell-${header.id}`}
                    scope="row"
                    padding="normal"
                    rowSpan={groupingSpan}
                    sx={{
                      ...(groupedHeader && header.allowGrouping
                        ? {
                            borderRight: 1,
                            borderColor: '#e0e0e0',
                            verticalAlign: 'top'
                          }
                        : {})
                    }}
                  >
                    {cellValue}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })
      ) : (
        <TableRow
          key={1}
          data-testid={`row-${1}`}
          sx={{ borderTop: '1pt solid #e0e0e0' }}
        >
          <TableCell colSpan={headers.length} align="center">
            No data to display
          </TableCell>
        </TableRow>
      )}
    </MuiTableBody>
  );
};
