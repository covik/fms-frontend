import { Box, Container, Snackbar, Typography } from '@mui/material';
import logo from '../../assets/logo.svg';
import { LoginForm } from './LoginForm';
import { useState } from 'react';

export function LoginPage() {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setLoadingState] = useState(false);
  const [areCredentialsWrong, setCredentialsWrong] = useState(false);

  function tryLogin() {
    setLoadingState(true);
    setEmailError('Email je obavezan');
    setPasswordError('Lozinka je obavezna');
    setCredentialsWrong(true);
  }

  function hideSnackbar() {
    setCredentialsWrong(false);
  }

  return (
    <>
      <Snackbar
        open={areCredentialsWrong}
        message="Pogrešan email ili lozinka"
        data-testid="form-result"
        onClose={hideSnackbar}
        autoHideDuration={4000}
      />
      <Container component="main" maxWidth="xs" data-testid="login-form">
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
          <LoginForm
            onLoginAttempt={tryLogin}
            emailError={emailError}
            passwordError={passwordError}
            isLoading={isLoading}
          />
        </Box>
      </Container>
    </>
  );
}
