import type { AllToggles, ToggleType } from './toggles';

export function isDisabled(
  toggle: ToggleType,
  toggleList: AllToggles,
): boolean {
  return !toggleList[toggle];
}

export function isEnabled(toggle: ToggleType, toggleList: AllToggles): boolean {
  return !isDisabled(toggle, toggleList);
}
