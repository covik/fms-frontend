import { styled } from '@mui/material';
import { Layers } from 'mdi-material-ui';
import { useGoogleMap } from '@react-google-maps/api';

const ControlContainer = styled('div')({
  position: 'absolute',
  top: '10px',
  right: '10px',
});

const ControlButton = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '2px',
  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  width: '40px',
}));

export function MapTypeControl() {
  const map = useGoogleMap();

  if (!map) return null;

  function changeMapLayer() {
    if (!map) return;
    const layers = Object.keys(google.maps.MapTypeId);
    const currentLayer = map.getMapTypeId()?.toLowerCase() ?? '';
    const currentIndex = layers.findIndex(
      (layer) => layer.toLowerCase() === currentLayer,
    );

    if (currentIndex < 0) return;

    const lastIndex = layers.length - 1;
    const nextIndex = currentIndex >= lastIndex ? 0 : currentIndex + 1;

    map.setMapTypeId(layers[nextIndex].toLowerCase());
  }

  return (
    <ControlContainer>
      <ControlButton onClick={changeMapLayer}>
        <Layers htmlColor={'#666'} sx={{ display: 'block' }} />
      </ControlButton>
    </ControlContainer>
  );
}
