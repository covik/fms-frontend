import { Box, styled } from '@mui/material';
import type { BoxProps } from '@mui/material';

export const Page = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});
Page.displayName = 'Page';

export interface PageProps extends BoxProps {}
