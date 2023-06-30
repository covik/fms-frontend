import { Box, styled } from '@mui/material';

export const PagePadding = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
}));
PagePadding.displayName = 'PagePadding';
