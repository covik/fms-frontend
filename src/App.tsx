import { Box } from '@mui/material';
import { Navigation } from './components/Navigation';
import { VehiclesDigestPage } from './components/VehiclesDigestPage';

export function App() {
  return (
    <>
      <Box component="main" sx={{ marginLeft: '57px' }}>
        <Navigation />
        <VehiclesDigestPage />
      </Box>
    </>
  );
}
