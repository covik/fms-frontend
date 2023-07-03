import { AuthProvider, SessionManager } from '#core/auth';
import { DateTimeProvider } from '#core/time';
import { DesignBaseline } from './design-baseline';
import { AuthenticatedApp } from './authenticated-app';

export function App() {
  return (
    <DateTimeProvider>
      <DesignBaseline>
        <AuthProvider>
          <SessionManager>
            <AuthenticatedApp />
          </SessionManager>
        </AuthProvider>
      </DesignBaseline>
    </DateTimeProvider>
  );
}
