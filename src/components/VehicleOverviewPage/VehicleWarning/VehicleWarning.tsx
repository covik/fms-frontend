import { Alert } from '@mui/material';
import { CloseCircleOutline, TimerAlertOutline } from 'mdi-material-ui';

export function WarningVehicleAwaitingInstallation() {
  return (
    <Alert severity={'info'}>
      Informacije nedostupne. Vozilo još nema ugrađen GPS uređaj.
    </Alert>
  );
}

export function WarningVehicleUnavailable() {
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

export function WarningVehicleDisabled() {
  return (
    <Alert icon={<CloseCircleOutline />} severity={'error'}>
      Vozilo je onemogućeno.
    </Alert>
  );
}
