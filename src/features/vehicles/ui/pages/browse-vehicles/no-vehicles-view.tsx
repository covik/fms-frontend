import { Box } from '@mui/material';
import { HumanDolly } from 'mdi-material-ui';
import { ExpectedErrorSituation } from '#ui/molecules/expected-error-situation';

export function NoVehiclesView() {
  return (
    <Box
      flex={'1'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <ExpectedErrorSituation
        Icon={HumanDolly}
        title={'Naručujemo GPS uređaje.'}
        subtitle={
          'Biti ćete obaviješteni kad stignu i kad ih instaliramo u vozila.'
        }
      />
    </Box>
  );
}
