import { Box, CircularProgress, Theme, Typography } from '@mui/material';
import React from 'react';

type LoadingIndicatorProps = {
  text?: string;
  size?: number;
  dense?: boolean;
};

export const LoadingIndicator = ({
  text = '',
  size = 40,
  dense = false
}: LoadingIndicatorProps) => {
  const classes = {
    fillSpace: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    spinner: {
      margin: (theme: Theme) => theme.spacing(2)
    },
    smallSpinner: {
      margin: (theme: Theme) => theme.spacing(0.5)
    }
  } as const;

  return (
    <Box sx={classes.fillSpace}>
      <CircularProgress
        sx={dense ? classes.smallSpinner : classes.spinner}
        size={size}
      />
      {text !== '' && (
        <Typography variant="h5" gutterBottom>
          {text}
        </Typography>
      )}
    </Box>
  );
};
