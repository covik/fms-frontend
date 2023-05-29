import { Box, Card, CardHeader, styled, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export interface TileAttributes {
  label: string;
  children: ReactNode;
}

export function Tile({ label, children }: TileAttributes) {
  return (
    <Card>
      <CardHeader
        title={label}
        titleTypographyProps={{
          variant: 'body1',
          fontWeight: 500,
        }}
        sx={{ paddingBottom: 0 }}
      />
      {children}
    </Card>
  );
}

export interface NoContentAttributes {
  children: ReactNode;
}

export function NoContent({ children }: NoContentAttributes) {
  return <Typography variant={'body2'}>{children}</Typography>;
}

export const TileContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));
