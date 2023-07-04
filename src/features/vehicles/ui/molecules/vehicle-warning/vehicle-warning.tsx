import { Alert, styled } from '@mui/material';
import { CloseCircleOutline, TimerAlertOutline } from 'mdi-material-ui';

export type VehicleWarningType = 'unavailable' | 'disabled' | 'no-position';

export interface VehicleWarningAttributes {
  type: VehicleWarningType;
}

export function VehicleWarning({ type }: VehicleWarningAttributes) {
  if (type === 'unavailable') return <WarningVehicleUnavailable />;
  if (type === 'disabled') return <WarningVehicleDisabled />;
  if (type === 'no-position') return <WarningVehicleAwaitingInstallation />;
  return null;
}

const StyledAlert = styled(Alert)({ alignItems: 'center' });

function WarningVehicleAwaitingInstallation() {
  return (
    <StyledAlert severity={'info'}>
      Vozilo još nema ugrađen GPS uređaj.
    </StyledAlert>
  );
}

function WarningVehicleUnavailable() {
  return (
    <StyledAlert icon={<TimerAlertOutline />} severity={'warning'}>
      Ovo vozilo nije javilo poziciju više od 65 minuta. Prikazano stanje vozila
      možda nije u skladu sa stvarnim stanjem.
    </StyledAlert>
  );
}

function WarningVehicleDisabled() {
  return (
    <StyledAlert icon={<CloseCircleOutline />} severity={'error'}>
      Vozilo je onemogućeno.
    </StyledAlert>
  );
}
