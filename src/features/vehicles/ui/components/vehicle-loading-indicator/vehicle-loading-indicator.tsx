import { Box, CircularProgress, Typography } from '@mui/material';

export function VehicleLoadingIndicator() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Box>
        <CircularProgress size={50} thickness={5} variant={'indeterminate'} />
      </Box>
      <Typography component={'div'} variant={'body2'} marginTop={1}>
        Učitavanje vozila
      </Typography>
    </Box>
  );
}
