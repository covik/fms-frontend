import { styled, svgIconClasses } from '@mui/material';

const name = 'AppBar';

export const AppBar = styled('div', {
  name,
  slot: 'Background',
})(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
}));

export const AppBarBottom = styled(AppBar)(({ theme }) => ({
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
}));

export const AppBarToolbar = styled('header', {
  name,
  slot: 'Root',
})(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'max-content 1fr max-content',
  gridTemplateAreas: '"menu content action"',
  alignItems: 'center',
  gap: theme.spacing(2),

  [`& .${svgIconClasses.root}`]: {
    display: 'block',
  },
}));

export const AppBarContent = styled('section', {
  name,
  slot: 'Content',
})({
  gridArea: 'content',
});

export const AppBarMenu = styled('section', {
  name,
  slot: 'Menu',
})({
  gridArea: 'menu',
});

export const AppBarAction = styled('section', {
  name,
  slot: 'Action',
})({
  gridArea: 'action',
});

export const AppBarTitle = styled('span', {
  name,
  slot: 'Title',
})(({ theme }) => ({
  display: 'block',
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
}));
