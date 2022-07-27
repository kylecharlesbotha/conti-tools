import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField
} from '@mui/material';
import { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { UploadErrorsTable } from 'src/common';
import { FileUploadZone } from 'src/common/file-upload-zone/FileUploadZone';
import { useFileUploadService } from 'src/services/file-upload-service';
import { UploadException } from 'src/types';

interface IReportUploadDialog {
  open: boolean;
  handleClickClose: () => void;
}

export const ReportUploadDialog = ({
  open,
  handleClickClose
}: IReportUploadDialog) => {
  const [errors, setErrors] = useState<Record<string, string[]>>();
  const [uploadFile, setUploadFile] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [commentIdentifier, setCommentIdentifier] = useState('');
  const [fileName, setFileName] = useState('');
  const { uploadReport } = useFileUploadService();
  const [isLoading, setIsLoading] = useState(false);

  const processFile = async () => {
    setIsLoading(true);
    if (uploadFile) {
      const response = (await uploadReport(
        uploadFile,
        fileName,
        commentIdentifier
      )) as AxiosResponse;
      if (response.status < 300 && response.status >= 200) {
        setFileName('');
        handleClickClose();
      }
      const { errors } = response.data as UploadException;
      setErrors(errors);
    }
    setIsLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClickClose}
      PaperProps={{ sx: { minWidth: '500px' } }}
    >
      <DialogTitle>Upload Report</DialogTitle>
      <DialogContent>
        <Box>
          <FormControl>
            <TextField
              sx={{ mt: 1 }}
              required
              id="outlined-required"
              label="Comment Identifier"
              variant="outlined"
              helperText="Comment Identifier: e.g. 08-17"
              onChange={(e) => setCommentIdentifier(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box mt={2}>
          <FileUploadZone
            setUploadFile={setUploadFile}
            setFileName={setFileName}
            fileName={fileName}
            hasUploadError={!isEmpty(errors)}
          />
          <UploadErrorsTable errors={errors} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 3 }}>
        <Button
          onClick={() => {
            handleClickClose();
            setErrors(undefined);
            setFileName('');
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          onClick={processFile}
          disabled={
            commentIdentifier.trim().length === 0 ||
            fileName.trim().length === 0
          }
          loading={isLoading}
        >
          Upload
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
