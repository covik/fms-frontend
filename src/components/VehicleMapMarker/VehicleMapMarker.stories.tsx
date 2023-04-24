import { VehicleMapMarker } from './VehicleMapMarker';
import { Meta, StoryFn } from '@storybook/react';
import * as IconStory from '../VehicleMapIcon/VehicleMapIcon.stories';
import { Map } from '../Map';

const center = {
  lat: 44.111175964131334,
  lng: 15.247462805177106,
};

export default {
  component: VehicleMapMarker,
  decorators: [
    (Story) => (
      <Map x={center.lat} y={center.lng} z={18} width={400} height={400}>
        <Story />
      </Map>
    ),
  ],
} as Meta<typeof VehicleMapMarker>;

export const StationaryWithoutIgnition = () => (
  <VehicleMapMarker position={center} name={'Transporter'}>
    <IconStory.StationaryWithoutIgnition />
  </VehicleMapMarker>
);

export const StationaryWithIgnition = () => (
  <VehicleMapMarker position={center} name={'Transporter'}>
    <IconStory.StationaryWithIgnition />
  </VehicleMapMarker>
);

export const MovingWithIgnition = () => (
  <VehicleMapMarker position={center} name={'Transporter'}>
    <IconStory.MovingWithIgnition />
  </VehicleMapMarker>
);
