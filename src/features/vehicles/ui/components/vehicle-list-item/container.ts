import { styled } from '@mui/material';

export const Grid = styled('div')(({ theme }) => ({
  'display': 'grid',
  'gridTemplateColumns': 'max-content 1fr max-content max-content',
  'gap': theme.spacing(1),
  'alignItems': 'center',

  '& svg': {
    display: 'block',
  },
}));
Grid.displayName = 'Grid';
