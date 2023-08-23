import { Page } from './page';
import type { ReactNode } from 'react';

export interface FluidPageAttributes {
  children: ReactNode;
}

export function FluidPage({ children }: FluidPageAttributes) {
  return <Page>{children}</Page>;
}
