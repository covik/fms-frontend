import { Box, Typography } from '@mui/material';
import { CarOff } from 'mdi-material-ui';

export function VehicleNotFound() {
  return (
    <Box
      color={(theme) => theme.palette.text.secondary}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Box
        fontSize={'130px'}
        lineHeight={1}
        color={(theme) => theme.palette.text.disabled}
      >
        <CarOff fontSize={'inherit'} sx={{ display: 'block' }} />
      </Box>

      <Typography
        component={'h1'}
        variant={'h6'}
        fontWeight={(theme) => theme.typography.fontWeightBold}
        marginTop={1}
      >
        Vozilo nije pronađeno.
      </Typography>

      <Box marginTop={0.5}>
        Vozilo više ne postoji, nije nikad postojalo ili nemate ovlasti.
      </Box>
    </Box>
  );
}
