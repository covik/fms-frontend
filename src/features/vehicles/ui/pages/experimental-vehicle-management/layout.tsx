import { styled, useMediaQuery, useTheme } from '@mui/material';
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
  gridTemplateAreas: '"content" "sidebar"',
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
    <ControlPanel>{children}</ControlPanel>
  );
}
