import { Alert } from '@mui/material';
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

function WarningVehicleAwaitingInstallation() {
  return <Alert severity={'info'}>Vozilo još nema ugrađen GPS uređaj.</Alert>;
}

function WarningVehicleUnavailable() {
  return (
    <Alert
      icon={<TimerAlertOutline />}
      severity={'warning'}
      sx={{ alignItems: 'center' }}
    >
      Ovo vozilo nije javilo poziciju više od 65 minuta. Prikazano stanje vozila
      možda nije u skladu sa stvarnim stanjem.
    </Alert>
  );
}

function WarningVehicleDisabled() {
  return (
    <Alert icon={<CloseCircleOutline />} severity={'error'}>
      Vozilo je onemogućeno.
    </Alert>
  );
}
