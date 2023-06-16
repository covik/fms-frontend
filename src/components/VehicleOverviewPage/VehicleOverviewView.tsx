import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { CloseCircleOutline, TimerAlertOutline } from 'mdi-material-ui';
import { FixedPage } from '../Page';
import { PageTitle } from '../PageTitle';
import type { ReactNode } from 'react';

export interface VehicleOverviewViewAttributes {
  title: string;
  children: ReactNode;
}

export function VehicleOverviewView({
  title,
  children,
}: VehicleOverviewViewAttributes) {
  return (
    <FixedPage>
      <Box
        padding={1}
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
      >
        <PageTitle>{title}</PageTitle>
        {children}
      </Box>
    </FixedPage>
  );
}

export function VehicleLoadingIndicator() {
  return (
    <Box
      sx={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box>
        <CircularProgress size={50} thickness={5} variant={'indeterminate'} />
      </Box>
      <Typography component={'div'} variant={'body2'} marginTop={1}>
        Učitavanje vozila
      </Typography>
    </Box>
  );
}

export function WarningVehicleAwaitingInstallation() {
  return (
    <Alert severity={'info'}>
      Informacije nedostupne. Vozilo još nema ugrađen GPS uređaj.
    </Alert>
  );
}

export function WarningOutdatedPositionData() {
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
