import { Box, Button, Typography } from '@mui/material';
import { EmoticonCryOutline } from 'mdi-material-ui';

export interface SessionFailureViewAttributes {
  onRetryRequest: () => void;
}

export function SessionFailureView({
  onRetryRequest,
}: SessionFailureViewAttributes) {
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
      <Box
        sx={{
          textAlign: 'center',
          color: 'grey',
          paddingLeft: 2,
          paddingRight: 2,
        }}
        data-testid={testingSelectors.container}
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
          data-testid={testingSelectors.retry}
          onClick={onRetryRequest}
        >
          Pokušaj ponovo
        </Button>
      </Box>
    </Box>
  );
}

export const testingSelectors = {
  container: 'session-failure',
  retry: 'retry-session-fetch',
};
