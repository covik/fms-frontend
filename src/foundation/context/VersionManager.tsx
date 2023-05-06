import { createContext, useContext, useMemo } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import type { ReactNode } from 'react';

interface UpdateOptions {
  isUpdateReady: boolean;
  applyUpdate: () => void;
}

const VersionContext = createContext<UpdateOptions | undefined>(undefined);

export function AppVersionProvider({ children }: { children: ReactNode }) {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  return (
    <VersionProvider
      isUpdateReady={needRefresh}
      applyUpdate={updateServiceWorker}
    >
      {children}
    </VersionProvider>
  );
}

export function useVersionManager(): UpdateOptions {
  const context = useContext(VersionContext);

  if (context === undefined) {
    throw new Error(
      'VersionContext should not return undefined. Forgot to call VersionProvider?',
    );
  }

  return context;
}

export function VersionProvider({
  children,
  isUpdateReady,
  applyUpdate,
}: UpdateOptions & { children: ReactNode }) {
  const value = useMemo(
    () => ({ isUpdateReady, applyUpdate }),
    [isUpdateReady, applyUpdate],
  );

  return (
    <VersionContext.Provider value={value}>{children}</VersionContext.Provider>
  );
}
