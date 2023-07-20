import { styled } from '@mui/material';
import { MapAddressInput } from './address-input';

const SearchBarContainer = styled('div')({
  position: 'absolute',
  top: '10px',
  left: '10px',
  right: '60px',
  maxWidth: '300px',
});

export function MapAddressSearchControl() {
  return (
    <SearchBarContainer>
      <MapAddressInput />
    </SearchBarContainer>
  );
}
