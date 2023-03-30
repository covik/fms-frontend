import { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '../../lib/SessionService';
import type { ReactNode } from 'react';

interface AuthAPI {
  isFetching: boolean;
}

const AuthContext = createContext<AuthAPI | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<'fetching' | 'inactive'>('fetching');
  const isFetching = state === 'fetching';

  useEffect(() => {
    Session.check().then(() => setState('inactive'));
  }, []);

  return (
    <AuthContext.Provider value={{ isFetching }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthAPI {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error('AuthContext should not return undefined');

  return context;
}
