import { useUser } from '#core/auth';
import { AccountView } from './AccountView';
import { Administrator } from '../../models/User';
import { Logout } from './Logout';

export function AccountPage() {
  const user = useUser();

  return (
    <AccountView
      name={user.fullName()}
      email={user.email()}
      isAdmin={user instanceof Administrator}
    >
      <Logout />
    </AccountView>
  );
}
