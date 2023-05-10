import { useUser } from '../../foundation';
import { AccountView } from './AccountView';
import { Administrator } from '../../models/User';

export function AccountPage() {
  const user = useUser();

  return (
    <AccountView
      name={user.fullName()}
      email={user.email()}
      isAdmin={user instanceof Administrator}
    >
      {''}
    </AccountView>
  );
}
