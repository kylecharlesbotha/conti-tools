import { Box, Button, CircularProgress } from '@mui/material';
import format from 'date-fns/format';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { downloadFile } from 'src/lib';
import { useFileUploadService } from 'src/services/file-upload-service';

export const ReportsDownloadContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getBackorderCombinedReport } = useFileUploadService();
  const { enqueueSnackbar } = useSnackbar();
  const downloadExport = async () => {
    try {
      setIsLoading(true);

      const fileBlob = await getBackorderCombinedReport();
      const fileName = `${format(
        new Date(),
        'yyyy-MM-dd'
      )}_viewings-export.XLSX`;

      downloadFile(fileBlob, fileName);

      setIsLoading(false);
    } catch (err) {
      enqueueSnackbar('There was an error downloading the Viewings report.', {
        variant: 'error'
      });
      setIsLoading(false);
    }
  };
  return (
    <Box p={2} display="flex">
      <Button
        variant="contained"
        onClick={() => downloadExport()}
        disabled={isLoading}
      >
        Export Viewings CSV
      </Button>
      {isLoading && <CircularProgress variant="indeterminate" />}
    </Box>
  );
};
export default ReportsDownloadContainer;
