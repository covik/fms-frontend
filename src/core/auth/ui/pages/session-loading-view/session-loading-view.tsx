import { styled } from '@mui/material';
import { SessionLoadingIndicator } from '../../atoms/session-loading-indicator';

const Container = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export function SessionLoadingView() {
  return (
    <Container>
      <SessionLoadingIndicator />
    </Container>
  );
}
