import { ReactNode } from 'react';
import { FluidPage, PagePadding } from '#ui/atoms/page';
import { styled } from '@mui/material';

export interface PageLayoutAttributes {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutAttributes) {
  return (
    <FluidPage>
      <PagePadding>{children}</PagePadding>
    </FluidPage>
  );
}

export const PageHeader = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
