import { Button } from '@mui/material';
import { AlertCircleOutline } from 'mdi-material-ui';
import { ExpectedErrorSituation } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Molecules/Expected Error Situation',
  component: ExpectedErrorSituation,
} satisfies Meta<typeof ExpectedErrorSituation>;
type Story = StoryObj<typeof ExpectedErrorSituation>;

export const Default: Story = {
  args: {
    title: 'Naslov situacije.',
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    Icon: AlertCircleOutline,
  },
};

export const WithSubtitle: Story = {
  args: {
    ...WithIcon.args,
    subtitle: 'Podnaslov koji opisuje što korisnik može učiniti.',
  },
};

export const WithActionButton: Story = {
  args: {
    ...WithSubtitle.args,
    action: (
      <Button color={'error'} variant={'contained'}>
        Pokušaj ponovo
      </Button>
    ),
  },
};
