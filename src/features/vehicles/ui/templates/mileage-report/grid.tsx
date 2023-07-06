import { styled } from '@mui/material';

const breakpoint = 'md';

export const ContentContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'max-content 1fr',
  gap: theme.spacing(1),
  [theme.breakpoints.down(breakpoint)]: {
    gridTemplateColumns: 'auto',
  },
}));
ContentContainer.displayName = 'ContentContainer';

export const CalendarContainer = styled('aside')(({ theme }) => ({
  [theme.breakpoints.up(breakpoint)]: {
    maxWidth: '250px',
    overflowX: 'hidden',
  },
}));
CalendarContainer.displayName = 'CalendarContainer';

export const PageContent = styled('main')({});
PageContent.displayName = 'PageContent';
