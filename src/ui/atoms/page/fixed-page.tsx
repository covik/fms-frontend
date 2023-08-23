import { Page } from './page';
import { GlobalStyles } from '@mui/material';
import type { ReactNode } from 'react';

export interface FixedPageAttributes {
  children: ReactNode;
}

export function FixedPage({ children }: FixedPageAttributes) {
  return (
    <>
      <GlobalStyles
        styles={{
          '#root': {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      />
      <Page flex={1} height={0}>
        {children}
      </Page>
    </>
  );
}
