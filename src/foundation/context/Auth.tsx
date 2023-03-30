import { createContext } from 'react';
import type { ReactNode } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={undefined}>{children}</AuthContext.Provider>
  );
}
