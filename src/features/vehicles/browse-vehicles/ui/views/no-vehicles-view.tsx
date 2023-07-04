import { Box, Typography } from '@mui/material';
import { HumanDolly } from 'mdi-material-ui';

export function NoVehiclesView() {
  return (
    <Box
      sx={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center', color: 'grey' }}>
        <Box sx={{ fontSize: '180px' }}>
          <HumanDolly fontSize={'inherit'} htmlColor={'grey'} />
        </Box>
        <Typography variant={'h5'}>Naručujemo GPS uređaje</Typography>
        <span>
          Biti ćete obaviješteni kad stignu i kad ih instaliramo u vozila
        </span>
      </Box>
    </Box>
  );
}
