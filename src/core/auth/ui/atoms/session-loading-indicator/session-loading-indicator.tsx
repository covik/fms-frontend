import { CircularProgress } from '@mui/material';
import { loadingIndicator } from './selectors';

export function SessionLoadingIndicator() {
  return (
    <CircularProgress
      size="4rem"
      thickness={5}
      data-testid={loadingIndicator}
    />
  );
}
