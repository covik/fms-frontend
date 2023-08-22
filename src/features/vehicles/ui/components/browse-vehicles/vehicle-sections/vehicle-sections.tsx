import { Stack } from '@mui/material';
import { spaceBetweenVehicles } from './section';
import type { ReactNode } from 'react';

export interface VehicleSectionsAttributes {
  children: ReactNode;
}

export function VehicleSections({ children }: VehicleSectionsAttributes) {
  return <Stack spacing={spaceBetweenVehicles}>{children}</Stack>;
}
