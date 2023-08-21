import { Page } from './page';
import { useLayout } from '#core/layout';
import type { ReactNode } from 'react';

export interface FluidPageAttributes {
  children: ReactNode;
}

export function FluidPage({ children }: FluidPageAttributes) {
  const { offsetBottom, offsetLeft, offsetTop } = useLayout();
  return (
    <Page
      paddingBottom={offsetBottom}
      marginLeft={offsetLeft}
      marginTop={offsetTop}
    >
      {children}
    </Page>
  );
}
