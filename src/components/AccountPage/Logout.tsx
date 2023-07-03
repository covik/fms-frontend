import { Button, CircularProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '#core/auth';
import { Session } from '#lib/SessionService';

export function Logout() {
  const { finishLogout } = useAuth();

  const logoutRequest = useMutation({
    mutationFn: () => Session.destroy(),
    onSuccess: () => finishLogout(),
  });

  function performLogout() {
    logoutRequest.mutate();
  }

  const inProgress = logoutRequest.status === 'loading';

  return (
    <Button
      color={'primary'}
      variant={'contained'}
      fullWidth
      onClick={performLogout}
    >
      {inProgress ? (
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
