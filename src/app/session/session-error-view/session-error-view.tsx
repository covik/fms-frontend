import { styled } from '@mui/material';
import { SessionError } from '../session-error';
import type { SessionErrorAttributes } from '../session-error';

export interface SessionErrorViewAttributes extends SessionErrorAttributes {}

const Container = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
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
