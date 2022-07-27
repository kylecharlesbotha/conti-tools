import { Box, styled, Typography, Chip } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { head } from 'lodash';
import FolderIcon from '@mui/icons-material/Folder';

interface IFileUploadZone {
  setUploadFile: (file: string | ArrayBuffer | null | undefined) => void;
  setFileName: (fileName: string) => void;
  fileName: string;
  hasUploadError: boolean;
}

const Input = styled('input')({
  display: 'none'
});

export const FileUploadZone = ({
  setUploadFile,
  setFileName,
  fileName,
  hasUploadError
}: IFileUploadZone) => {
  const onDrop = async (acceptedFiles: File[]) => {
    const file = head(acceptedFiles);
    if (file) {
      setFileName(file.name);
      setUploadFile(await toBase64(file));
    }
  };

  const toBase64 = (file: File) =>
    new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    onDrop
  });

  const handleDeleteFile = () => {
    setFileName('');
    setUploadFile(null);
  };

  return (
    <>
      {fileName === '' ? (
        <Box
          display="flex"
          alignItems="center"
          alignContent="center"
          justifyContent="space-around"
          flexDirection="column"
          border="2px dashed"
          borderColor="main"
          p={5}
          {...getRootProps({ className: 'dropzone' })}
          sx={{ cursor: 'pointer' }}
        >
          <Input {...getInputProps()} />
          <Typography color="grey.500">
            Drag and drop your file here, or click to select a file
          </Typography>
          <Typography color="#FF7276" sx={{ pt: 3 }}>
            .xlsx files only
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="subtitle1">
            File Name:{' '}
            <Chip
              label={fileName}
              variant="outlined"
              color={hasUploadError ? 'error' : 'default'}
              icon={<FolderIcon />}
              onDelete={() => handleDeleteFile()}
            />
          </Typography>
        </Box>
      )}
    </>
  );
};
