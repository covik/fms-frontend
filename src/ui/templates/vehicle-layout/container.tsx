import { styled } from '@mui/material';
import { FixedPage } from '../../../components/Page';
import type { ReactNode } from 'react';

const BaseContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: theme.spacing(1),
}));

const CenteredContent = styled(BaseContent)({
  alignItems: 'center',
  justifyContent: 'center',
});

export interface PageLayoutAttributes {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutAttributes) {
  return (
    <FixedPage>
      <BaseContent>{children}</BaseContent>
    </FixedPage>
  );
}

export function CenteredPageLayout({ children }: PageLayoutAttributes) {
  return (
    <FixedPage>
      <CenteredContent>{children}</CenteredContent>
    </FixedPage>
  );
}
