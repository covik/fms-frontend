import type { ReactElement, ReactNode } from 'react';

type AbstractDependency = never;

export interface DependencyConsumer<API, Options = never> {
  (props: Options): API;
}

export interface DependencyProvider<
  Options = AbstractDependency,
  Children = ReactNode,
> {
  (props: Options & ChildrenProp<Children>): ReactElement;
}

interface ChildrenProp<Type> {
  children: Type;
}
