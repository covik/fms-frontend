import { createContext, useContext, useMemo } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import type { ReactNode } from 'react';
import type { RegisterSWOptions } from 'vite-plugin-pwa/types';

interface UpdateOptions {
  isUpdateReady: boolean;
  applyUpdate: () => void;
}

const VersionContext = createContext<UpdateOptions | undefined>(undefined);

const UPDATE_INTERVAL_MS = 10 * 60 * 1000;
const onRegisteredSW: RegisterSWOptions['onRegisteredSW'] = (
  swScriptUrl,
  registration,
) => {
  if (registration) {
    setInterval(() => void registration.update(), UPDATE_INTERVAL_MS);
  }
};

export function AppVersionProvider({ children }: { children: ReactNode }) {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({ onRegisteredSW });

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
