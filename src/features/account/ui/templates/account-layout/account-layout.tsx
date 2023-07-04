import { FluidPage, PagePadding } from '#ui/atoms/page';
import type { ReactNode } from 'react';
import { Stack } from '@mui/material';

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

export interface PageContentAttributes {
  children: ReactNode;
}

export function PageContent({ children }: PageContentAttributes) {
  return <Stack spacing={1}>{children}</Stack>;
}
