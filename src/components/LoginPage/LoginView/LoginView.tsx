import {
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import logo from '../../../assets/logo.svg';
import type { FormEvent } from 'react';

export interface LoginViewAttributes {
  state:
    | 'initial'
    | 'submitting'
    | 'validation-error'
    | 'wrong-credentials'
    | 'unexpected-error';
  emailError: string;
  passwordError: string;
  onLoginAttempt: () => void;
}

export function LoginView({
  state,
  emailError = '',
  passwordError = '',
  onLoginAttempt,
}: LoginViewAttributes) {
  const isLoading = state === 'submitting';

  function attemptLogin(e: FormEvent) {
    e.preventDefault();
    onLoginAttempt();
  }

  const SubmitIndicator = (
    <CircularProgress
      size="2rem"
      color="inherit"
      data-testid={testingSelectors.form.submitIndicator}
    />
  );

  return (
    <>
      <Snackbar
        open={state === 'wrong-credentials'}
        message="Pogrešan email ili lozinka"
        data-testid={testingSelectors.form.result}
      />
      <Snackbar
        open={state === 'unexpected-error'}
        message="Došlo je do neočekivane greške"
      />
      <Container
        component="main"
        maxWidth="xs"
        data-testid={testingSelectors.form.container}
      >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <img src={logo} alt="" width="36" />
            <Typography
              component="h1"
              variant="h5"
              color="#464646"
              fontWeight="medium"
              sx={{ marginLeft: 2 }}
            >
              Zara Fleet
            </Typography>
          </Box>
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
              data-testid={testingSelectors.inputs.email}
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
              data-testid={testingSelectors.inputs.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginTop: 3 }}
              disabled={isLoading}
              data-testid={testingSelectors.inputs.submit}
            >
              {isLoading ? SubmitIndicator : 'Prijava'}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export const testingSelectors = {
  form: {
    container: 'login-form',
    result: 'form-result',
    submitIndicator: 'submit-indicator',
  },
  inputs: {
    email: 'email-input',
    password: 'password-input',
    submit: 'form-submit',
  },
};
