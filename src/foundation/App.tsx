import { SessionManager } from '#core/auth';
import type { ReactNode } from 'react';

export function App({ children }: { children: ReactNode }) {
  return <SessionManager>{children}</SessionManager>;
}
