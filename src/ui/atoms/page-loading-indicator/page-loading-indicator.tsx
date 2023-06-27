import { LinearProgress } from '@mui/material';

export function PageLoadingIndicator() {
  return (
    <LinearProgress
      sx={{ height: '6px', width: '100%' }}
      data-testid={'page-loading-spinner'}
    />
  );
}
