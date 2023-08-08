import { CarOff } from 'mdi-material-ui';
import { ExpectedErrorSituation } from '#ui/molecules/expected-error-situation';
import { ErrorContainer } from '#ui/organisms/error-container';

export function VehicleNotFound() {
  return (
    <ErrorContainer>
      <ExpectedErrorSituation
        Icon={CarOff}
        title={'Vozilo nije pronađeno.'}
        subtitle={
          'Vozilo više ne postoji, nije nikad postojalo ili nemate ovlasti.'
        }
      />
    </ErrorContainer>
  );
}
