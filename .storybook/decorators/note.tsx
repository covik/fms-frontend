import { Alert, Box } from '@mui/material';
import type { Decorator } from '@storybook/react';

export function withNote(message: string): Decorator {
  return (Story) => (
    <>
      <Story />
      <Box height={10} />
      <Alert severity={'info'}>{message}</Alert>
    </>
  );
}
