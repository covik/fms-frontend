import type { Meta } from '@storybook/react';
import { VersionProvider } from '../../foundation';
import { UpdateReadyBanner } from './UpdateReadyBanner';

export default {
  component: UpdateReadyBanner,
  render: () => (
    <VersionProvider isUpdateReady={true} applyUpdate={() => {}}>
      <UpdateReadyBanner />
    </VersionProvider>
  ),
} satisfies Meta<typeof UpdateReadyBanner>;

export const Default = {};
