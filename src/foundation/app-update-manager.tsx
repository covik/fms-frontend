import { useRegisterSW } from 'virtual:pwa-register/react';
import { VersionProvider } from '#core/version';
import type { RegisterSWOptions } from 'vite-plugin-pwa/types';
import type { ReactNode } from 'react';

const UPDATE_INTERVAL_MS = 10 * 60 * 1000;
const onRegisteredSW: RegisterSWOptions['onRegisteredSW'] = (
  _,
  registration,
) => {
  if (registration) {
    setInterval(() => void registration.update(), UPDATE_INTERVAL_MS);
  }
};

export function AppUpdateManager({ children }: { children: ReactNode }) {
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
