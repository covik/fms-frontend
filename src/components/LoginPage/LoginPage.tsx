import { Box, Container, Typography } from '@mui/material';
import logo from '../../assets/logo.svg';
import { LoginForm } from './LoginForm';

export function LoginPage() {
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
        <LoginForm />
      </Box>
    </Container>
  );
}
