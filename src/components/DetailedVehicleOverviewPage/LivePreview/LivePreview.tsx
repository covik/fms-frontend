import { Box, Card } from '@mui/material';
import { Map } from '../../Map';
import { LatestInformation } from './LatestInformation';

export function LivePreview() {
  return (
    <Box>
      <Card sx={{ height: '40vh', minHeight: '200px', marginBottom: 1.5 }}>
        <Map
          x={44.698832}
          y={16.373162}
          z={6}
          width="100%"
          height="100%"
          noControls
        />
      </Card>
      <LatestInformation />
    </Box>
  );
}
