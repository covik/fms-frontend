import { Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { TileRawContent } from './tile-raw-content';

export interface NoContentAttributes {
  children: ReactNode;
}

export function TileNoContent({ children }: NoContentAttributes) {
  return (
    <TileRawContent>
      <Typography variant={'body2'}>{children}</Typography>
    </TileRawContent>
  );
}
