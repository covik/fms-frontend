import { useLogout, useUser } from '#core/auth';
import { AccountView } from '../ui/pages/account-view';
import { Administrator } from '../../../models/user';

export default function AccountPage() {
  const user = useUser();
  const logout = useLogout();

  return (
    <AccountView
      name={user.fullName()}
      email={user.email()}
      isAdmin={user instanceof Administrator}
      logoutInProgress={logout.inProgress}
      logoutHandler={logout.perform}
    />
  );
}
