import { defaultToggles } from './toggles';
import type { AllToggles } from './toggles';

type Toggles = Partial<AllToggles>;

export function mergeToggles(...toggles: Toggles[]): AllToggles {
  if (!toggles || toggles.length === 0) return defaultToggles;

  if (toggles.some((toggleList) => !toggleList))
    throw TypeError('Some/all of toggle list is not an object.');

  return toggles.reduce(
    (accumulatedToggles, toggleList) => ({
      ...accumulatedToggles,
      ...filterUnknownToggles(toggleList),
    }),
    defaultToggles,
  ) as AllToggles;
}

function filterUnknownToggles(toggleList: Toggles) {
  return Object.keys(toggleList)
    .filter((key) => Object.keys(defaultToggles).includes(key))
    .reduce((cur, key) => {
      // @ts-expect-error
      return Object.assign(cur, { [key]: toggleList[key] });
    }, {});
}
