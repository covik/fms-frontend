import { styled } from '@mui/material';
import { SessionError } from '../../molecules/session-error';
import type { SessionErrorAttributes } from '../../molecules/session-error';

export interface SessionErrorViewAttributes extends SessionErrorAttributes {}

const Container = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export function SessionErrorView({
  onRetryRequest,
}: SessionErrorViewAttributes) {
  return (
    <Container>
      <SessionError onRetryRequest={onRetryRequest} />
    </Container>
  );
}
