import { Box, Button, Typography } from '@mui/material';
import { EmoticonCryOutline } from 'mdi-material-ui';
import { container, retryButton } from './selectors';

export interface SessionErrorAttributes {
  onRetryRequest: () => unknown;
}

export function SessionError({ onRetryRequest }: SessionErrorAttributes) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        color: 'grey',
        paddingLeft: 2,
        paddingRight: 2,
      }}
      data-testid={container}
    >
      <Box sx={{ fontSize: '130px', lineHeight: 1 }}>
        <EmoticonCryOutline fontSize={'inherit'} />
      </Box>

      <Typography variant={'h6'} fontWeight={'500'}>
        Greška prilikom dohvaćanja konfiguracije.
      </Typography>

      <Box sx={{ marginTop: 1, marginBottom: 4 }}>
        Možete pokušati ponovo. Ako se problem ponovi kontaktirajte podršku.
      </Box>

      <Button
        color={'error'}
        variant={'contained'}
        fullWidth
        data-testid={retryButton}
        onClick={onRetryRequest}
      >
        Pokušaj ponovo
      </Button>
    </Box>
  );
}
