import { HumanDolly } from 'mdi-material-ui';
import { ExpectedErrorSituation } from '#ui/molecules/expected-error-situation';
import { ErrorContainer } from '#ui/organisms/error-container';

export function NoVehiclesView() {
  return (
    <ErrorContainer>
      <ExpectedErrorSituation
        Icon={HumanDolly}
        title={'Naručujemo GPS uređaje.'}
        subtitle={
          'Biti ćete obaviješteni kad stignu i kad ih instaliramo u vozila.'
        }
      />
    </ErrorContainer>
  );
}
