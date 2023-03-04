import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { FormEvent } from 'react';

export interface LoginFormAttributes {
  isLoading?: boolean;
  emailError?: string;
  passwordError?: string;
  onLoginAttempt: () => void;
}

export function LoginForm({
  isLoading = false,
  emailError = '',
  passwordError = '',
  onLoginAttempt,
}: LoginFormAttributes) {
  function attemptLogin(e: FormEvent) {
    e.preventDefault();
    onLoginAttempt();
  }

  const ProgressIndicator = (
    <CircularProgress
      size="2rem"
      color="inherit"
      data-testid="progress-indicator"
    />
  );

  return (
    <Box component="form" onSubmit={attemptLogin} noValidate>
      <TextField
        margin="normal"
        fullWidth
        label="Email adresa"
        name="email"
        autoComplete="email"
        autoFocus
        disabled={isLoading}
        error={emailError !== ''}
        helperText={emailError}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password"
        label="Lozinka"
        type="password"
        autoComplete="current-password"
        disabled={isLoading}
        error={passwordError !== ''}
        helperText={passwordError}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ marginTop: 3 }}
        disabled={isLoading}
      >
        {isLoading ? ProgressIndicator : 'Prijava'}
      </Button>
    </Box>
  );
}
