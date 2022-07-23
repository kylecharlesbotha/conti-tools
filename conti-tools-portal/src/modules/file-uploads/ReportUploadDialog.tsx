import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
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
  const processFile = async () => {
    if (uploadFile) {
      const response = (await uploadReport(
        uploadFile,
        fileName,
        commentIdentifier
      )) as AxiosResponse;
      if (response.status < 300 && response.status >= 200) {
        handleClickClose();
      }
      const { errors } = response.data as UploadException;
      setErrors(errors);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClickClose}
      PaperProps={{ sx: { minWidth: '500px' } }}
    >
      <DialogTitle>Upload Products</DialogTitle>
      <DialogContent>
        <Box>
          <FormControl>
            <InputLabel id="demo-simple-select-filled-label">
              Comment Identifier
            </InputLabel>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
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
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={processFile}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};
