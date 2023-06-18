import { Page } from './Page';
import { useLayout } from '../Layout';
import type { ReactNode } from 'react';

export interface FixedPageAttributes {
  children: ReactNode;
}

export function FixedPage({ children }: FixedPageAttributes) {
  const { offsetBottom, offsetLeft } = useLayout();
  return (
    <Page
      height={`calc(100vh - ${offsetBottom})`}
      marginLeft={offsetLeft}
      overflow={'hidden'}
    >
      {children}
    </Page>
  );
}
