import { createContext, useContext } from 'react';
import { DefaultRenderer } from './default-renderer';
import type {
  PrivateRenderer,
  PublicRenderer,
  PublicRendererAttributes,
} from './types';
import type { NavigationItemAttributes } from '../types';

const NavigationRenderContext = createContext<PrivateRenderer>(DefaultRenderer);

export function useNavigationRenderer(
  props: NavigationItemAttributes,
): PublicRenderer {
  const RendererImplementation = useContext(NavigationRenderContext);

  // does it need useCallback optimization? does it matter?
  return CreateRealRenderer(RendererImplementation, props);
}

function CreateRealRenderer(
  PrivateRenderer: PrivateRenderer,
  props: NavigationItemAttributes,
): PublicRenderer {
  return function RenderItem({ children }: PublicRendererAttributes) {
    return <PrivateRenderer {...props}>{children}</PrivateRenderer>;
  };
}
