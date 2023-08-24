import { Link, styled } from '@mui/material';
import { useLinkProps, useMatches } from '#core/router';
import { BaseRenderer } from './base-renderer';
import { NavigationRendererProvider } from './context';
import type {
  ConcreteRendererProps,
  ConcreteRendererProviderAttributes,
} from './types';

const BlockLink = styled(Link)({
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
});

export function HyperlinkRenderer({
  children,
  ...props
}: ConcreteRendererProps) {
  const { label, icon, ...linkProps } = props;
  const realLinkProps = useLinkProps(props);

  const fullPaths = useMatches().map(({ route }) => route.fullPath);
  const isActive = fullPaths.includes(linkProps.to);

  return (
    <BlockLink {...realLinkProps}>
      <BaseRenderer selected={isActive}>{children}</BaseRenderer>
    </BlockLink>
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
