import type {
  Router,
  AnyRoute,
  AnyRoutesInfo,
  RoutesInfo,
} from '@tanstack/router';

export interface BaseRouterProps<
  TRouteTree extends AnyRoute = AnyRoute,
  TRoutesInfo extends AnyRoutesInfo = RoutesInfo<TRouteTree>,
> {
  router: InstanceType<typeof Router<TRouteTree, TRoutesInfo>>;
}
