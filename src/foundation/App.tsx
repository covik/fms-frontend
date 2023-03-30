import { Box, CircularProgress } from '@mui/material';
import {
  LoginPage,
  testingSelectors as loginSelectors,
} from '../components/LoginPage';
import { useAuth } from './';

export function App() {
  const { isFetching } = useAuth();

  if (isFetching) return <FullPageSpinner />;

  return <LoginPage />;
}

export const testingSelectors = {
  spinner: 'page-spinner',
  loginPage: loginSelectors.container,
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
