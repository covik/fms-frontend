import type { ReactElement } from 'react';
import type { LinkOptions, RegisteredRoutesInfo } from '#core/router';

export interface NavigationItemAttributes
  extends LinkOptions<RegisteredRoutesInfo> {
  label: string;
  icon: ReactElement;
}
