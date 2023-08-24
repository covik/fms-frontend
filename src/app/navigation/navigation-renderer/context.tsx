import { createContext, useContext } from 'react';
import { DefaultRenderer } from './default-renderer';
import type { ReactNode } from 'react';
import type {
  ConcreteRenderer,
  ItemProps,
  Renderer,
  RendererProps,
} from './types';

const NavigationRenderContext =
  createContext<ConcreteRenderer>(DefaultRenderer);

export function useNavigationRenderer(props: ItemProps): Renderer {
  const Renderer = useContext(NavigationRenderContext);

  // does it need useCallback optimization? does it matter?
  return CreateRenderer(Renderer, props);
}

function CreateRenderer(
  Renderer: ConcreteRenderer,
  props: ItemProps,
): Renderer {
  return function Item({ children }: RendererProps) {
    return <Renderer {...props}>{children}</Renderer>;
  };
}

export interface NavigationRendererProviderAttributes {
  Renderer: ConcreteRenderer;
  children: ReactNode;
}

export function NavigationRendererProvider({
  Renderer,
  children,
}: NavigationRendererProviderAttributes) {
  return (
    <NavigationRenderContext.Provider value={Renderer}>
      {children}
    </NavigationRenderContext.Provider>
  );
}
