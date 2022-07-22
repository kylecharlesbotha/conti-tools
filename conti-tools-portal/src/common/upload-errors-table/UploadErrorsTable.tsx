import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography
} from '@mui/material';
import { isEmpty } from 'lodash';

interface IUploadErrorsTable {
  errors?: Record<string, string[]>;
}

export const UploadErrorsTable = ({ errors }: IUploadErrorsTable) => {
  if (!errors || isEmpty(errors)) {
    return null;
  }

  return (
    <Box mt={2} sx={{ maxHeight: '250px', overflowY: 'auto' }}>
      <Typography
        variant="subtitle2"
        sx={{ color: (theme: Theme) => theme.palette.error.main }}
      >
        The following errors were found in the file:
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Line No / Field</TableCell>
            <TableCell>Error</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(errors).map(([key, value], errorIndex) => {
            return value.map((errorText, messageIndex) => (
              <TableRow key={`${errorIndex}-${messageIndex}`}>
                <TableCell>{key}</TableCell>
                <TableCell>{errorText}</TableCell>
              </TableRow>
            ));
          })}
        </TableBody>
      </Table>
    </Box>
  );
};
