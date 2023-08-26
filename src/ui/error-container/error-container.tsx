import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import type { BoxProps } from '@mui/material';

export interface ErrorContainerAttributes extends BoxProps {
  children: ReactNode;
}

export function ErrorContainer({
  children,
  ...props
}: ErrorContainerAttributes) {
  return (
    <Box
      flex={1}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      paddingX={2}
      paddingY={1}
      {...props}
    >
      {children}
    </Box>
  );
}
