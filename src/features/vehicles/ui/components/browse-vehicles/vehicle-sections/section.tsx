import { Alert, Divider, Stack, styled } from '@mui/material';
import type { ReactNode } from 'react';

export interface SectionAttributes {
  children: ReactNode;
}

export const spaceBetweenVehicles = 1.3;

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
