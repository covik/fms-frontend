import { Alert, Divider, Stack, styled } from '@mui/material';
import type { ReactNode } from 'react';

export interface SectionAttributes {
  children: ReactNode;
}

const spaceBetweenVehicles = 1.3;

export function VehicleSections({ children }: { children: ReactNode }) {
  return <Stack spacing={spaceBetweenVehicles}>{children}</Stack>;
}

export const Section = styled('div')({});

export const SectionHeader = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(spaceBetweenVehicles),
}));

export const SectionTitle = styled(Divider)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const SectionWarning = styled(Alert)({ alignItems: 'center' });

export function SectionContent({ children }: { children: ReactNode }) {
  return <Stack spacing={spaceBetweenVehicles}>{children}</Stack>;
}
