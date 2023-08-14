import { mergeToggles } from './merge';
import { defaultToggles } from './toggles';

type MergeAttribute = Parameters<typeof mergeToggles>[0];

it('should return defaults given no attributes', () => {
  expect(mergeToggles()).to.deep.equal(defaultToggles);
});

it('should return defaults given empty object', () => {
  expect(mergeToggles({})).to.deep.equal(defaultToggles);
});

it('should throw exception given invalid attribute(s)', () => {
  cy.testException(() => mergeToggles(null as unknown as MergeAttribute)).then(
    (exception) => {
      exception().should('be.instanceOf', TypeError);
    },
  );

  cy.testException(() =>
    mergeToggles(
      undefined as unknown as MergeAttribute,
      false as unknown as MergeAttribute,
      '' as unknown as MergeAttribute,
    ),
  ).then((exception) => {
    exception().should('be.instanceOf', TypeError);
  });
});

it('should throw exception given mix of valid and invalid attributes', () => {
  cy.testException(() =>
    mergeToggles(defaultToggles, null as unknown as MergeAttribute),
  ).then((exception) => {
    exception().should('be.instanceOf', TypeError);
  });
});

it('should merge with default toggles if only one attribute is supplied', () => {
  const oldValue = defaultToggles.report;
  const newValue = !oldValue;
  expect(mergeToggles({ report: newValue })).to.deep.equal({
    ...defaultToggles,
    report: newValue,
  });
});

it('should merge two or more attributes on top of defaults with last one winning', () => {
  const firstBatch = {
    'vehicle.list': false,
    'report.mileage': true,
  };
  const secondBatch = {
    'report.mileage': false,
  };
  const finalOutput = {
    ...defaultToggles,
    'vehicle.list': false,
    'report.mileage': false,
  };

  expect(mergeToggles(firstBatch, secondBatch)).to.deep.equal(finalOutput);
});

it('should filter out not defined toggles', () => {
  expect(
    mergeToggles({
      'missing.toggle.in.default.toggles': true,
    } as unknown as MergeAttribute),
  ).to.deep.equal(defaultToggles);
});
