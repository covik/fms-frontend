import { CircularProgress, Paper, paperClasses } from '@mui/material';

export const className = paperClasses.root;

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
