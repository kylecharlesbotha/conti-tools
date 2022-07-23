import { Button, Grid, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { usePageTitle } from 'src/common';
import { Table, TableContextProvider } from 'src/common/table';
import { useFileUploadService } from 'src/services/file-upload-service';
import { PaginatedResponse, Request, TableRowData } from 'src/types';
import { ReportUploadDialog } from './ReportUploadDialog';

const headers = [
  {
    id: 'fileName',
    label: 'File Name'
  },
  {
    id: 'commentIdentifier',
    label: 'Comment Identifier'
  },
  {
    id: 'dateUploaded',
    label: 'Date Uploaded'
  }
];

export const FileUploadsContainer = () => {
  const [open, setOpen] = useState(false);
  const { setPageTitle } = usePageTitle();
  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => {
    setOpen(false);
    setRefreshKey(new Date().getMilliseconds());
  };

  const { getFileUploadsList } = useFileUploadService();

  const [refreshKey, setRefreshKey] = useState<number>(
    new Date().getMilliseconds()
  );

  const fetchRows = async ({
    page,
    pageSize
  }: Request): Promise<PaginatedResponse<TableRowData>> => {
    const paginatedResponse = await getFileUploadsList({
      page,
      pageSize
    });
    const tableRows = paginatedResponse.items;

    return { ...paginatedResponse, items: tableRows };
  };

  useEffect(() => setPageTitle('File uploads'), [setPageTitle]);

  return (
    <TableContextProvider disableSort>
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2} display="flex" alignItems="center">
          <Grid item xs>
            <Button variant="contained" onClick={handleClickOpen}>
              Upload Report
            </Button>
          </Grid>
        </Grid>
        <Table key={refreshKey} headers={headers} fetchRows={fetchRows} />
      </Paper>
      <ReportUploadDialog open={open} handleClickClose={handleClickClose} />
    </TableContextProvider>
  );
};

export default FileUploadsContainer;
