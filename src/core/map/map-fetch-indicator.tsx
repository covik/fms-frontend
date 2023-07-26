import { CircularProgress, Paper } from '@mui/material';

export const className = 'map-fetch-indicator';

export function MapFetchIndicator() {
  return (
    <Paper
      elevation={0}
      sx={{ padding: 1, width: 'fit-content' }}
      className={className}
    >
      <CircularProgress
        sx={{ display: 'block' }}
        disableShrink={true}
        thickness={5}
        size={20}
      />
    </Paper>
  );
}
