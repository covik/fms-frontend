import type { AllToggles, ToggleKeys } from './toggles';

export function isDisabled(
  toggle: ToggleKeys,
  toggleList: AllToggles,
): boolean {
  return !toggleList[toggle];
}

export function isEnabled(toggle: ToggleKeys, toggleList: AllToggles): boolean {
  return !isDisabled(toggle, toggleList);
}
