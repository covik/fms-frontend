import { HyperlinkRenderer } from './renderer';
import { NavigationRendererProvider } from '../context';
import type { ReactNode } from 'react';

export function HyperlinkRendererProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <NavigationRendererProvider Renderer={HyperlinkRenderer}>
      {children}
    </NavigationRendererProvider>
  );
}
