import { Box, Container, Typography } from '@mui/material';
import logo from '../../assets/logo.svg';
import { LoginForm } from './LoginForm';
import { useState } from 'react';

export function LoginPage() {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function tryLogin() {
    setEmailError('Email je obavezan');
    setPasswordError('Lozinka je obavezna');
  }

  return (
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
        />
      </Box>
    </Container>
  );
}
