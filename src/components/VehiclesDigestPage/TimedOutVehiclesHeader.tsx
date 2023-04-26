import { Alert, Divider, styled } from '@mui/material';
import { AlertCircle as IconAlert } from 'mdi-material-ui';

const StyledDivider = styled(Divider)({ color: 'grey', marginBottom: 1 });
const StyledAlert = styled(Alert)({ alignItems: 'center' });

export function TimedOutVehiclesHeader() {
  return (
    <>
      <StyledDivider textAlign={'center'}>Ne ažurirani</StyledDivider>
      <StyledAlert color={'warning'} icon={<IconAlert />}>
        Ova vozila nisu javila poziciju više od 65 minuta. Prikazano stanje
        vozila možda nije u skladu sa stvarnim stanjem.
      </StyledAlert>
    </>
  );
}
