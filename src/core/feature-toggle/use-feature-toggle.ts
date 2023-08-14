import { useCallback } from 'react';
import { mergeToggles } from './merge';
import {
  isDisabled as isToggleDisabled,
  isEnabled as isToggleEnabled,
} from './verify';
import { useUser } from '../auth';
import type { ToggleKeys } from './toggles';

export interface FeatureToggleAPI {
  isDisabled: (toggle: ToggleKeys) => boolean;
  isEnabled: (toggle: ToggleKeys) => boolean;
}

export function useFeatureToggle(): FeatureToggleAPI {
  const user = useUser();

  const resolvedUserFeatures = mergeToggles({
    users: user.userLimit() !== 0,
  });

  const isDisabled = useCallback(
    (toggle: ToggleKeys) => isToggleDisabled(toggle, resolvedUserFeatures),
    [],
  );

  const isEnabled = useCallback(
    (toggle: ToggleKeys) => isToggleEnabled(toggle, resolvedUserFeatures),
    [],
  );

  return {
    isDisabled,
    isEnabled,
  };
}
