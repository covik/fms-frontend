import { CarOff } from 'mdi-material-ui';
import { ExpectedErrorSituation } from '#ui/molecules/expected-error-situation';

export function VehicleNotFound() {
  return (
    <ExpectedErrorSituation
      Icon={CarOff}
      title={'Vozilo nije pronađeno.'}
      subtitle={
        'Vozilo više ne postoji, nije nikad postojalo ili nemate ovlasti.'
      }
    />
  );
}
