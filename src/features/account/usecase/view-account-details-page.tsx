import { useLogout, useUser } from '#core/auth';
import { AccountView } from '../ui/pages/account-view';
import { Administrator } from '../../../core/auth/user';

export default function ViewAccountDetailsPage() {
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
