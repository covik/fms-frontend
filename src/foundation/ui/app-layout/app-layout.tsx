import { PrimaryNavigation } from '#core/navigation';
import type { ReactNode } from 'react';

export interface AppLayoutAttributes {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutAttributes) {
  return (
    <>
      <PrimaryNavigation />
      {children}
    </>
  );
}
