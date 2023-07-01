import { styled } from '@mui/material';
import { FixedPage, PagePadding } from '#ui/atoms/page';
import type { ReactNode } from 'react';

const BaseContent = styled(PagePadding)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

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
