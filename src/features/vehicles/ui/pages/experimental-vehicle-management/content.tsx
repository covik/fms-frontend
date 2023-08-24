import { Box } from '@mui/material';
import { ControlPanel } from './control-panel';
import type { ReactNode } from 'react';

export interface ContentAttributes {
  children: ReactNode;
}

export function Content({ children }: ContentAttributes) {
  return (
    <ControlPanel>
      <Box padding={1.5}>{children}</Box>
    </ControlPanel>
  );
}
