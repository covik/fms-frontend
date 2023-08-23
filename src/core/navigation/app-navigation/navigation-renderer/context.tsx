import { createContext, useContext } from 'react';
import { DefaultRenderer } from './default-renderer';
import type { FC } from 'react';
import type {
  NavigationImplementationRendererAttributes,
  NavigationRendererAttributes,
} from './types';
import type { NavigationItemAttributes } from '../types';

export interface NavigationRenderAPI {
  Renderer: FC<NavigationImplementationRendererAttributes>;
}

export interface NavigationRendererOptions {
  Renderer: FC<NavigationRendererAttributes>;
}

const NavigationRenderContext = createContext<
  NavigationRendererOptions | undefined
>(undefined);

export function useNavigationRenderer(
  props: NavigationItemAttributes,
): NavigationRenderAPI {
  const { Renderer } = useContext(NavigationRenderContext) ?? {
    Renderer: DefaultRenderer,
  };
  const ActualRenderer = CreateRenderer(Renderer, props);

  return {
    Renderer: ActualRenderer,
  };
}

function CreateRenderer(
  Renderer: FC<NavigationImplementationRendererAttributes>,
  props: NavigationItemAttributes,
) {
  return function RenderItem({ children }: NavigationRendererAttributes) {
    return <Renderer {...props}>{children}</Renderer>;
  };
}
