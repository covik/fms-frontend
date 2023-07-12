import { Button, CircularProgress } from '@mui/material';

export interface LogoutButtonAttributes {
  loading: boolean;
  onClick: () => void;
}

export function LogoutButton({ loading, onClick }: LogoutButtonAttributes) {
  return (
    <Button color={'primary'} variant={'contained'} fullWidth onClick={onClick}>
      {loading ? (
        <CircularProgress
          variant={'indeterminate'}
          thickness={5}
          size={35}
          sx={{ color: '#fff', padding: 1 }}
        />
      ) : (
        'Odjava'
      )}
    </Button>
  );
}
