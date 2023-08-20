import {
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { Logo } from '#ui/atoms/logo';
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
  onLoginAttempt: (email: string, password: string) => void;
}

export function LoginView({
  state,
  emailError = '',
  passwordError = '',
  onLoginAttempt,
}: LoginViewAttributes) {
  const isLoading = state === 'submitting';

  function attemptLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = new FormData(e.target as HTMLFormElement);
    onLoginAttempt(String(input.get('email')), String(input.get('password')));
  }

  const SubmitIndicator = (
    <CircularProgress
      size="2rem"
      color="inherit"
      data-testid={testingSelectors.submitIndicator}
    />
  );

  const isValidationError = state === 'validation-error';
  return (
    <>
      <Snackbar
        open={state === 'wrong-credentials'}
        message="Pogrešan email ili lozinka"
        data-testid={testingSelectors.result}
      />
      <Snackbar
        open={state === 'unexpected-error'}
        message="Došlo je do neočekivane greške"
        data-testid={testingSelectors.result}
      />
      <Container
        component="main"
        maxWidth="xs"
        data-testid={testingSelectors.container}
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
            <Logo size={40} />
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
          <Box
            component="form"
            onSubmit={attemptLogin}
            noValidate
            data-testid={testingSelectors.form}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Email adresa"
              name="email"
              autoComplete="email"
              autoFocus
              disabled={isLoading}
              error={emailError !== '' && isValidationError}
              helperText={isValidationError ? emailError : ''}
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
              error={passwordError !== '' && isValidationError}
              helperText={isValidationError ? passwordError : ''}
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
  container: 'login-view',
  result: 'form-result',
  form: 'login-form',
  submitIndicator: 'submit-indicator',
  inputs: {
    email: 'email-input',
    password: 'password-input',
    submit: 'form-submit',
  },
};
