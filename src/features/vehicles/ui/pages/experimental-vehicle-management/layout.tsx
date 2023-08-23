import { Box, styled, useMediaQuery, useTheme } from '@mui/material';
import { FixedPage, PagePadding } from '#ui/atoms/page';
import { ControlPanel } from './control-panel';
import type { ReactNode } from 'react';

const BaseContent = styled(PagePadding)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export interface PageLayoutAttributes {
  children: ReactNode;
}

export function Page({ children }: PageLayoutAttributes) {
  return (
    <FixedPage>
      <BaseContent>{children}</BaseContent>
    </FixedPage>
  );
}

const breakpoint = 'sm';

export const Main = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'grid',
  gridTemplateRows: '1fr max-content',
  gridTemplateAreas: '"content" "content"',
  gap: theme.spacing(1),

  [theme.breakpoints.up(breakpoint)]: {
    gridTemplateColumns: 'minmax(300px, 1fr) 4fr',
    gridTemplateRows: 'auto',
    gridTemplateAreas: '"sidebar content"',
  },
}));

export const Content = styled('div')({
  gridArea: 'content',
});

const SidebarContainer = styled('div')({
  gridArea: 'sidebar',
  overflow: 'auto',

  // fixes card shadows due to overflow auto
  padding: '2px',
  margin: '-2px',
});

export interface SidebarAttributes {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarAttributes) {
  const theme = useTheme();
  const largeEnoughScreen = useMediaQuery(theme.breakpoints.up(breakpoint));

  return largeEnoughScreen ? (
    <SidebarContainer>{children}</SidebarContainer>
  ) : (
    <ControlPanel>
      <Box padding={1.5}>{children}</Box>
    </ControlPanel>
  );
}
