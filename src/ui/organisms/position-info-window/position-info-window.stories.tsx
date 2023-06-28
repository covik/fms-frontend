import { PositionInfoWindow } from '.';
import { AppMap, MapSettingsProvider } from '../../../components/Map';
import { Coordinates } from '../../../lib/Dimension';
import type { Meta } from '@storybook/react';

const position = new Coordinates(44.187229419, 15.4347317613);

export default {
  title: 'Organisms/Position Info Window',
  component: PositionInfoWindow,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    coordinates: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <MapSettingsProvider center={position} zoom={17}>
        <AppMap
          sx={{ height: 'calc(100vh - 16px)', margin: '8px' }}
          clickablePoi={false}
        >
          <Story />
        </AppMap>
      </MapSettingsProvider>
    ),
  ],
} satisfies Meta<typeof PositionInfoWindow>;

export const MovingIgnitionOn = {
  args: {
    coordinates: position,
    date: '02.05.2023. 13:20:15',
    speed: '34 km/h',
    voltage: '26.3 V',
    mileage: '133013.1 km',
    ignition: true,
    movement: true,
  },
};

export const MovingIgnitionOff = {
  args: {
    ...MovingIgnitionOn.args,
    ignition: false,
  },
};

export const StationaryIgnitionOn = {
  args: {
    ...MovingIgnitionOn.args,
    movement: false,
  },
};

export const StationaryIgnitionOff = {
  args: {
    ...MovingIgnitionOff.args,
    movement: false,
  },
};
