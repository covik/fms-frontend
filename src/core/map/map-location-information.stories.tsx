import { styled } from '@mui/material';
import { MapLocationInformation } from './map-location-information';
import { Meta, StoryObj } from '@storybook/react';
import { AppMap } from './map';
import { MapSettingsProvider } from './map-settings';
import { Coordinates } from '#lib/dimension';
import { InfoWindow } from '@react-google-maps/api';

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
    return (
      <MapSettingsProvider
        center={new Coordinates(args.latitude, args.longitude)}
        zoom={16}
      >
        <AppMap sx={{ height: '400px' }}>
          <InfoWindow position={{ lat: args.latitude, lng: args.longitude }}>
            <MapLocationInformation {...args} />
          </InfoWindow>
        </AppMap>
      </MapSettingsProvider>
    );
  },
};
