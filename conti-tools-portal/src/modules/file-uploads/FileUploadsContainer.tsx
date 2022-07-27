import { Box, Button, Grid, IconButton, Paper } from '@mui/material';
import format from 'date-fns/format';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { usePageTitle } from 'src/common';
import { Table, TableContextProvider } from 'src/common/table';
import { downloadFile, renderDate } from 'src/lib';
import { useFileUploadService } from 'src/services/file-upload-service';
import { PaginatedResponse, Request, TableRowData } from 'src/types';
import { ReportUploadDialog } from './ReportUploadDialog';
import { LoadingButton } from '@mui/lab';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

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
  },
  {
    id: 'downloadBtn',
    label: ''
  }
];

export const FileUploadsContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    getBackorderCombinedReport,
    deleteFileUpload,
    getBackorderReportExcel
  } = useFileUploadService();
  const { enqueueSnackbar } = useSnackbar();
  const [fileCount, setFilecount] = useState(0);
  const downloadExport = async () => {
    try {
      setIsLoading(true);

      const fileBlob = await getBackorderCombinedReport();
      const fileName = `${format(
        new Date(),
        'yyyy-MM-dd'
      )}_aberdare-merged-report.XLSX`;

      downloadFile(fileBlob, fileName);

      setIsLoading(false);
    } catch (err) {
      enqueueSnackbar('There was an error downloading the Viewings report.', {
        variant: 'error'
      });
      setIsLoading(false);
    }
  };

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

  const handleOnClickDownload = async (fileUploadId: string) => {
    const file = await getBackorderReportExcel(fileUploadId);

    const fileName = `${format(new Date(), 'yyyy-MM-dd')}-test.XLSX`;

    downloadFile(file, fileName);
    setRefreshKey(new Date().getMilliseconds());
  };

  const handleOnClickDelete = async (fileUploadId: string) => {
    await deleteFileUpload(fileUploadId);
    setRefreshKey(new Date().getMilliseconds());
  };

  const fetchRows = async ({
    page,
    pageSize
  }: Request): Promise<PaginatedResponse<TableRowData>> => {
    const paginatedResponse = await getFileUploadsList({
      page,
      pageSize
    });
    const tableRows = paginatedResponse.items.map((item) => {
      const dateUploaded = new Date(item.dateUploaded);
      return {
        ...item,
        dateUploaded: renderDate(dateUploaded),
        downloadBtn: (
          <Box sx={{ float: 'right' }}>
            <IconButton
              sx={{ mr: 10 }}
              color="info"
              aria-label="upload picture"
              component="span"
              onClick={() => handleOnClickDownload(item.fileUploadId)}
            >
              <DownloadIcon />
            </IconButton>
            <IconButton
              sx={{ mr: 5 }}
              color="error"
              aria-label="upload picture"
              component="span"
              onClick={() => handleOnClickDelete(item.fileUploadId)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )
      };
    });

    setFilecount(tableRows.length);

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
          <Grid item sx={{ display: 'flex' }}>
            <LoadingButton
              variant="contained"
              onClick={() => downloadExport()}
              disabled={isLoading || fileCount === 0}
              loading={isLoading}
            >
              Export Merged Report
            </LoadingButton>
          </Grid>
        </Grid>
        <Table key={refreshKey} headers={headers} fetchRows={fetchRows} />
      </Paper>
      <ReportUploadDialog open={open} handleClickClose={handleClickClose} />
    </TableContextProvider>
  );
};

export default FileUploadsContainer;
