import { styled } from '@mui/material';

export const TitlePlaceholder = styled('div')({ backgroundColor: '#999' });
export const NavPlaceholder = styled('div')({ backgroundColor: '#888' });
export const ContentPlaceholder = styled('div')({ backgroundColor: '#777' });
export const FullHeightContentPlaceholder = styled(ContentPlaceholder)({
  height: '100%',
});
export const SquareContentPlaceholder = styled(ContentPlaceholder)({
  width: '200px',
  height: '200px',
});
