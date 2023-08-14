import { isDisabled, isEnabled } from './verify';
import { defaultToggles, ToggleKeys } from './toggles';

specify(
  'isEnabled should return false if given toggle is not present in toggle list',
  () => {
    expect(
      isEnabled('undefined.toggle' as ToggleKeys, defaultToggles),
    ).to.equal(false);
  },
);
specify('isEnabled should return false if given toggle is false', () => {
  expect(
    isEnabled('vehicle.live', { ...defaultToggles, 'vehicle.live': false }),
  ).to.equal(false);
});
specify('isEnabled should return true if given toggle is true', () => {
  expect(
    isEnabled('vehicle.live', { ...defaultToggles, 'vehicle.live': true }),
  ).to.equal(true);
});

specify(
  'isDisabled should return true if given toggle is not present in toggle list',
  () => {
    expect(
      isDisabled('undefined.toggle' as ToggleKeys, defaultToggles),
    ).to.equal(true);
  },
);
specify('isDisabled should return true if given toggle is false', () => {
  expect(
    isDisabled('vehicle.live', { ...defaultToggles, 'vehicle.live': false }),
  ).to.equal(true);
});
specify('isDisabled should return true if given toggle is true', () => {
  expect(
    isDisabled('vehicle.live', { ...defaultToggles, 'vehicle.live': true }),
  ).to.equal(false);
});
