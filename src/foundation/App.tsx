import { AuthProvider, SessionManager } from '#core/auth';
import { DateTimeProvider } from '#core/time';
import { DesignBaseline } from './DesignBaseline';
import { AuthenticatedApp } from './AuthenticatedApp';

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
