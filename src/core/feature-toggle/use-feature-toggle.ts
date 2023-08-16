import { useCallback } from 'react';
import { mergeToggles } from './merge';
import {
  isDisabled as isToggleDisabled,
  isEnabled as isToggleEnabled,
} from './verify';
import { useUser } from '../auth';
import type { ToggleType } from './toggles';

export interface FeatureToggleAPI {
  isDisabled: (toggle: ToggleType) => boolean;
  isEnabled: (toggle: ToggleType) => boolean;
}

export function useFeatureToggle(): FeatureToggleAPI {
  const user = useUser();

  const resolvedUserFeatures = mergeToggles({
    users: user.userLimit() !== 0,
  });

  const isDisabled = useCallback(
    (toggle: ToggleType) => isToggleDisabled(toggle, resolvedUserFeatures),
    [],
  );

  const isEnabled = useCallback(
    (toggle: ToggleType) => isToggleEnabled(toggle, resolvedUserFeatures),
    [],
  );

  return {
    isDisabled,
    isEnabled,
  };
}
