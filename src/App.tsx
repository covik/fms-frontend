import { Box } from '@mui/material';
import { Navigation } from './components/Navigation';
import { VehicleOverviewPage } from './components/VehicleOverviewPage';

export function App() {
  return (
    <>
      <Box component="main" sx={{ marginLeft: '57px' }}>
        <Navigation />
        <VehicleOverviewPage />
      </Box>
    </>
  );
}
