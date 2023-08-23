import { createContext, useContext } from 'react';
import { DefaultRenderer } from './default-renderer';
import type { FC } from 'react';
import type { NavigationRendererAttributes } from './types';
import type { NavigationItemAttributes } from '../types';

export interface NavigationRenderAPI {
  Renderer: FC<NavigationRendererAttributes>;
}

const NavigationRenderContext = createContext<NavigationRenderAPI>({
  /* default renderer ? */
  Renderer: DefaultRenderer,
});

export function useNavigationRenderer(
  props: NavigationItemAttributes,
): NavigationRenderAPI {
  const { Renderer } = useContext(NavigationRenderContext);

  return {
    Renderer,
  };
}
