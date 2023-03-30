import { Box, CircularProgress } from '@mui/material';

export function App() {
  return <FullPageSpinner />;
}

export const testingSelectors = {
  spinner: 'page-spinner',
};

function FullPageSpinner() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress
        size="4rem"
        thickness={5}
        data-testid={testingSelectors.spinner}
      />
    </Box>
  );
}
