import { Button } from '@mui/material';
import { EmoticonCryOutline } from 'mdi-material-ui';
import { ExpectedErrorSituation } from 'src/ui/expected-error-situation';
import { ErrorContainer } from 'src/ui/error-container';
import { container, retryButton } from './selectors';

export interface SessionErrorAttributes {
  onRetryRequest: () => unknown;
}

export function SessionError({ onRetryRequest }: SessionErrorAttributes) {
  return (
    <ErrorContainer data-testid={container}>
      <ExpectedErrorSituation
        Icon={EmoticonCryOutline}
        title={'Greška prilikom dohvaćanja konfiguracije.'}
        subtitle={
          'Možete pokušati ponovo. Ako se problem ponovi kontaktirajte podršku.'
        }
        action={
          <Button
            color={'error'}
            variant={'contained'}
            fullWidth
            data-testid={retryButton}
            onClick={onRetryRequest}
          >
            Pokušaj ponovo
          </Button>
        }
      />
    </ErrorContainer>
  );
}
