import { useLogout, useUser, Administrator } from '#core/auth';
import { AccountView } from '../ui/pages/account-view';

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
