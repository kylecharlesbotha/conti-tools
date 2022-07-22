import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { usePageTitle } from 'src/common';
import { ReportUploadDialog } from './ReportUploadDialog';

export const FileUploadsContainer = () => {
  const [open, setOpen] = useState(false);
  const { setPageTitle } = usePageTitle();
  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);
  useEffect(() => setPageTitle('File uploads'), [setPageTitle]);

  return (
    <>
      <h1>File Uploads</h1>
      <Button variant="contained" onClick={handleClickOpen}>
        Upload Report
      </Button>
      <ReportUploadDialog open={open} handleClickClose={handleClickClose} />
    </>
  );
};

export default FileUploadsContainer;
