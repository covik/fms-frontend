import { Button, CircularProgress } from '@mui/material';
import { useLogout } from '#core/auth';

export function Logout() {
  const logout = useLogout();

  return (
    <Button
      color={'primary'}
      variant={'contained'}
      fullWidth
      onClick={logout.perform}
    >
      {logout.inProgress ? (
        <CircularProgress
          variant={'indeterminate'}
          thickness={5}
          size={45}
          sx={{ color: '#fff', padding: 1 }}
        />
      ) : (
        'Odjava'
      )}
    </Button>
  );
}
