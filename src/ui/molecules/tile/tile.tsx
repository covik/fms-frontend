import { Card, CardHeader } from '@mui/material';
import type { ReactNode } from 'react';

export interface TileAttributes {
  label?: string;
  children: ReactNode;
}

export function Tile({ label, children }: TileAttributes) {
  return (
    <Card>
      {label && label.trim() !== '' ? (
        <CardHeader
          title={label}
          titleTypographyProps={{
            variant: 'body1',
            fontWeight: 500,
          }}
          sx={{ paddingBottom: 0 }}
        />
      ) : null}
      {children}
    </Card>
  );
}
