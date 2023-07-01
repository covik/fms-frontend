import { styled } from '@mui/material';
import { FixedPage } from '#ui/atoms/page';
import type { ReactNode } from 'react';

export interface PageLayoutAttributes {
  children: ReactNode;
}

const BaseContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: theme.spacing(1),
}));

export function PageLayout({ children }: PageLayoutAttributes) {
  return (
    <FixedPage>
      <BaseContent>{children}</BaseContent>
    </FixedPage>
  );
}
