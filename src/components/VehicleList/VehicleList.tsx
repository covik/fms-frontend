import { Box } from '@mui/material';
import { ReactNode } from 'react';

export const spaceBetweenItems = 2;

export function VehicleList({ children }: { children?: ReactNode }) {
  return <Box sx={{ ...spaceOutChildren() }}>{children}</Box>;
}

function spaceOutChildren() {
  return {
    '> *:not(:last-child)': { marginBottom: spaceBetweenItems },
  };
}
