import { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '../../lib/SessionService';
import type { ReactNode } from 'react';

interface AuthAPI {
  isFetching: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthAPI | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<'fetching' | 'active' | 'inactive'>(
    'fetching',
  );
  const isFetching = state === 'fetching';
  const isAuthenticated = state === 'active';

  useEffect(() => {
    Session.check().then((isSuccessful) =>
      setState(isSuccessful ? 'active' : 'inactive'),
    );
  }, []);

  return (
    <AuthContext.Provider value={{ isFetching, isAuthenticated }}>
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
