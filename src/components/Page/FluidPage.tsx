import { Page } from './Page';
import { useLayout } from '../Layout';
import type { ReactNode } from 'react';

export interface FluidPageAttributes {
  children: ReactNode;
}

export function FluidPage({ children }: FluidPageAttributes) {
  const { offsetBottom, offsetLeft } = useLayout();
  return (
    <Page paddingBottom={offsetBottom} marginLeft={offsetLeft}>
      {children}
    </Page>
  );
}
