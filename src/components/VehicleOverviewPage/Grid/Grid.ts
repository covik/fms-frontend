import { styled } from '@mui/material';

const spacing = 1;

export const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'min-content 1fr',
  gap: theme.spacing(spacing),
  height: '0',
  flex: 1,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gridTemplateRows: '2fr 3fr',
  },
}));
Grid.displayName = 'Grid';

export const GridSidebar = styled('div')({
  overflowY: 'auto',
});
GridSidebar.displayName = 'GridSidebar';

export const GridSidebarTiles = styled(GridSidebar)({
  minWidth: '300px',
  padding: '2px',
  margin: '-2px',
});
GridSidebarTiles.displayName = 'GridSidebarTiles';

export const GridContent = styled('div')({});
GridContent.displayName = 'GridContent';
