import { Stack, styled } from '@mui/material';
import type { ReactNode } from 'react';

export const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(330px,max-content) 1fr',
  gap: theme.spacing(1),
  height: '0',
  flex: 1,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gridTemplateRows: '2fr 3fr',
  },
}));
Grid.displayName = 'Grid';

const BaseSidebar = styled('div')({
  overflowY: 'auto',
  padding: '2px',
  margin: '-2px',
});

export interface GridSidebarAttributes {
  children: ReactNode;
}

export function GridSidebar({ children }: GridSidebarAttributes) {
  return (
    <BaseSidebar>
      <Stack spacing={1}>{children}</Stack>
    </BaseSidebar>
  );
}

export const GridContent = styled('div')({});
GridContent.displayName = 'GridContent';
