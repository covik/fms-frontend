import type { ReactElement } from 'react';

export interface NavigationRendererAttributes {
  children: (selected: boolean) => ReactElement;
}
