import { styled } from '@mui/material';
import { Coordinates } from '#lib/dimension';
import { MapLocationInformation } from './map-location-information';
import { AppMap } from './map';
import { MapSettingsProvider } from './map-settings';
import { MapInfoWindow } from './map-info-window';
import type { Meta, StoryObj } from '@storybook/react';

const Container = styled('div')({
  backgroundColor: 'white',
  borderRadius: '4px',
  padding: '10px',
  width: 'fit-content',
});

export default {
  title: 'Molecules/Map Location Information',
  component: MapLocationInformation,
} satisfies Meta<typeof MapLocationInformation>;
type Story = StoryObj<typeof MapLocationInformation>;

export const Default: Story = {
  args: {
    latitude: 44.11763872667418,
    longitude: 15.220339101597052,
    headingInDegrees: 300,
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
};

export const OnMap: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => {
    const coordinates = new Coordinates(args.latitude, args.longitude);
    return (
      <MapSettingsProvider center={coordinates} zoom={16}>
        <AppMap sx={{ height: '400px' }}>
          <MapInfoWindow coordinates={coordinates}>
            <MapLocationInformation {...args} />
          </MapInfoWindow>
        </AppMap>
      </MapSettingsProvider>
    );
  },
};
