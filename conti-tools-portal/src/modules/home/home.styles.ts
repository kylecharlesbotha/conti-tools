import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  paper: {
    height: '500px'
  },
  list: {
    height: '100%',
    overflowY: 'scroll'
  },
  card: {
    margin: 1,
    backgroundColor: '#bfd8ff'
  }
};
