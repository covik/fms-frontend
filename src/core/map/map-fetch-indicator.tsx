import { CircularProgress, Paper, paperClasses } from '@mui/material';

export const className = paperClasses.root;

/* position: 'absolute',
        zIndex: 1,
        bottom: '10px',
        left: '10px', */

export function MapFetchIndicator() {
  return (
    <Paper elevation={0} sx={{ padding: 1, width: 'fit-content' }}>
      <CircularProgress
        sx={{ display: 'block' }}
        disableShrink={true}
        thickness={5}
        size={20}
      />
    </Paper>
  );
}
