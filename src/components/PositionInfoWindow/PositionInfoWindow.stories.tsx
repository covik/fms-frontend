import { PositionInfoWindow } from '.';
import { AppMap, MapSettingsProvider } from '../Map';
import { Coordinates } from '../../lib/Dimension';
import type { Meta } from '@storybook/react';

const position = new Coordinates(44.187229419, 15.4347317613);

export default {
  component: PositionInfoWindow,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      return (
        <MapSettingsProvider center={position} zoom={17}>
          <AppMap sx={{ height: '100vh' }} clickablePoi={false}>
            <Story />
          </AppMap>
        </MapSettingsProvider>
      );
    },
  ],
} satisfies Meta<typeof PositionInfoWindow>;

export const MovingIgnitionOn = {
  args: {
    coordinates: position,
    date: '02.05.2023. 13:20:15',
    speed: '34 km/h',
    voltage: '26.3 V',
    mileage: '133013.1 km',
    ignitionColor: 'green',
    movementColor: 'green',
  },
};

export const MovingIgnitionOff = {
  args: {
    ...MovingIgnitionOn.args,
    ignitionColor: 'orange',
  },
};

export const StationaryIgnitionOn = {
  args: {
    ...MovingIgnitionOn.args,
    movementColor: 'orange',
  },
};

export const StationaryIgnitionOff = {
  args: {
    ...MovingIgnitionOff.args,
    movementColor: 'orange',
  },
};
