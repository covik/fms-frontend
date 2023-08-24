import { Link, useMatches } from '@tanstack/router';
import { BaseRenderer } from './base-renderer';
import { NavigationRendererProvider } from './context';
import type {
  ConcreteRendererProps,
  ConcreteRendererProviderAttributes,
} from './types';

function HyperlinkRenderer({ children, ...props }: ConcreteRendererProps) {
  const { label, icon, ...linkProps } = props;

  const fullPaths = useMatches().map(({ route }) => route.fullPath);
  const isActive = fullPaths.includes(linkProps.to);

  return (
    <Link
      {...linkProps}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <BaseRenderer selected={isActive}>{children}</BaseRenderer>
    </Link>
  );
}

export function HyperlinkRendererProvider({
  children,
}: ConcreteRendererProviderAttributes) {
  return (
    <NavigationRendererProvider Renderer={HyperlinkRenderer}>
      {children}
    </NavigationRendererProvider>
  );
}
