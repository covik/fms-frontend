import { Tile } from './tile';
import { TileListContent } from './tile-list-content';
import { TileNoContent } from './tile-no-content';
import { TileRawContent } from './tile-raw-content';
import { Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Cog, Delete, Logout } from 'mdi-material-ui';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Tile',
  component: Tile,
} satisfies Meta<typeof Tile>;
type Story = StoryObj<typeof Tile>;

export const ListContent: Story = {
  args: {
    label: 'Račun',
  },
  render: (args) => (
    <Tile label={args.label}>
      <TileListContent>
        <ListItem>
          <ListItemIcon>
            <Cog />
          </ListItemIcon>
          <ListItemText primary={'Postavke'} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary={'Odjava'} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary={'Obriši račun'} />
        </ListItem>
      </TileListContent>
    </Tile>
  ),
};

export const NoContent: Story = {
  args: {
    label: 'Informacije',
  },
  render: (args) => (
    <Tile label={args.label}>
      <TileNoContent>Nema informacija</TileNoContent>
    </Tile>
  ),
};

export const TextContent: Story = {
  args: {
    label: 'Sažetak',
  },
  render: (args) => (
    <Tile label={args.label}>
      <TileRawContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et
        aliquet lectus. Suspendisse condimentum purus at fermentum consequat.
        Fusce eu ornare orci, non vehicula dui. Duis varius sit amet justo et
        tempor. Curabitur consectetur ex sit amet nulla laoreet ornare. Nam
        commodo, lorem vel ullamcorper rhoncus, tortor purus posuere mauris, sed
        sollicitudin sapien purus at dui. Phasellus sodales pretium hendrerit.
        Curabitur sodales pretium ultricies. Aliquam finibus lacus in mattis
        cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
        posuere cubilia curae; Vestibulum sit amet est faucibus turpis mattis
        interdum. Class aptent taciti sociosqu ad litora torquent per conubia
        nostra, per inceptos himenaeos. Praesent mollis metus eu faucibus
        maximus. Sed pulvinar elit vel augue tristique blandit. Praesent
        faucibus suscipit purus, eu bibendum magna feugiat et. In congue et erat
        vitae hendrerit. Sed fermentum nunc nec volutpat egestas. Praesent justo
        ipsum, finibus a diam quis, sodales tristique dui. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Fusce ac justo nunc. Donec egestas massa non blandit consequat.
      </TileRawContent>
    </Tile>
  ),
};
