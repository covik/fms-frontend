import { Page } from './page';
import { useLayout } from '#core/layout';
import type { ReactNode } from 'react';

export interface FixedPageAttributes {
  children: ReactNode;
}

export function FixedPage({ children }: FixedPageAttributes) {
  const { offsetBottom, offsetLeft, offsetTop } = useLayout();
  return (
    <Page
      height={`calc(100vh - ${offsetBottom} - ${offsetTop})`}
      marginLeft={offsetLeft}
      marginTop={offsetTop}
      overflow={'hidden'}
    >
      {children}
    </Page>
  );
}
