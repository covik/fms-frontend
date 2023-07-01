import { Decorator } from '@storybook/react';
import { NavigationProvider } from '#ui/molecules/navigation';
import type { ActiveNavigationItemResolver } from '#ui/molecules/navigation';

const indexBasedActiveItemResolver =
  (index: number): ActiveNavigationItemResolver =>
  (items) => {
    if (items[index]) return items[index];
    return undefined;
  };

export function withNavigation(activeItemIndex: number): Decorator {
  return function NavigationDecorator(Story) {
    return (
      <NavigationProvider
        resolveActiveItem={indexBasedActiveItemResolver(activeItemIndex)}
      >
        <Story />
      </NavigationProvider>
    );
  };
}
