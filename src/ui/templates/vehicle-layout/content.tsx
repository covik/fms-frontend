import { styled } from '@mui/material';

export const PageHeader = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
PageHeader.displayName = 'PageHeader';

export const PageContent = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: 0,
});
PageContent.displayName = 'PageContent';

export const WarningContainer = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
