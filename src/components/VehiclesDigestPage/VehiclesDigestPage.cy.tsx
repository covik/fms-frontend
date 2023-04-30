import { VehiclesDigestPage, testingSelectors } from './VehiclesDigestPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/query-core';
import { Vehicle } from '../../lib/VehicleService';
import { OperationalVehicle } from '../../models/Vehicle';
import { locatedVehicleAttributes } from '../../../cypress/fixtures/base-and-located-vehicle-attributes';
import { WebShare } from '../../lib/WebShare';

const operationalVehicle1 = new OperationalVehicle(locatedVehicleAttributes);

describe(VehiclesDigestPage.name, () => {
  specify(
    'given no native sharing mechanism the toast notification should pop up',
    () => {
      stubVehicleList();
      simulateShareFailedBecauseNoMechanismExists();
      mountPage();
      assertToastIsNotVisible();
      triggerShare();
      assertToastIsVisible().assertMessage(
        'Vaša platforma ne podržava dijeljenje poveznica.',
      );
    },
  );

  specify(
    'given sharing fails for unknown reason the toast notification should pop up',
    () => {
      stubVehicleList();
      simulateShareFailedForUnknownReason();
      mountPage();
      assertToastIsNotVisible();
      triggerShare();
      assertToastIsVisible().assertMessage(
        'Neočekivana greška prilikom dijeljenja poveznice.',
      );
    },
  );

  specify(
    'given sharing is aborted the toast notification should not pop up',
    () => {
      stubVehicleList();
      simulateSharingAborted();
      mountPage();
      assertToastIsNotVisible();
      triggerShare();
      assertToastIsNotVisible();
    },
  );

  specify(
    'given successfully shared vehicle via native WebShare API the toast notification should not pop up',
    () => {
      stubVehicleList();
      simulateShareViaNativeApi();
      mountPage();
      assertToastIsNotVisible();
      triggerShare();
      assertToastIsNotVisible();
    },
  );

  specify(
    'given successfully shared vehicle via Clipboard API the toast notification should pop up',
    () => {
      stubVehicleList();
      simulateShareViaClipboard();
      mountPage();
      assertToastIsNotVisible();
      triggerShare();
      assertToastIsVisible().assertMessage(
        `Poveznica lokacije vozila ${operationalVehicle1.name()} kopirana u međuspremnik.`,
      );
    },
  );
});

function stubVehicleList() {
  cy.stub(Vehicle, 'fetchAll').callsFake(() =>
    Promise.resolve([operationalVehicle1]),
  );
}

function simulateShareFailedBecauseNoMechanismExists() {
  cy.stub(WebShare, 'shareUrl').callsFake(() =>
    Promise.reject(new WebShare.NoNativeSharingMechanism()),
  );
}

function simulateShareFailedForUnknownReason() {
  cy.stub(WebShare, 'shareUrl').callsFake(() =>
    Promise.reject(new Error('Share failed unexpectedly.')),
  );
}

function simulateSharingAborted() {
  cy.stub(WebShare, 'shareUrl').callsFake(() =>
    Promise.reject(new DOMException('Sharing aborted.', 'AbortError')),
  );
}

function simulateShareViaNativeApi() {
  cy.stub(WebShare, 'shareUrl').callsFake(() => Promise.resolve('webshare'));
}

function simulateShareViaClipboard() {
  cy.stub(WebShare, 'shareUrl').callsFake(() => Promise.resolve('clipboard'));
}

function mountPage() {
  cy.mount(
    <QueryClientProvider client={createTestClient()}>
      <VehiclesDigestPage refetchInterval={false} />
    </QueryClientProvider>,
  );
}

function createTestClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  });
}

function assertToastIsNotVisible() {
  cy.get(`[data-testid="${testingSelectors.toast}"]`).should('not.exist');
}

function assertToastIsVisible() {
  cy.get(`[data-testid="${testingSelectors.toast}"]`).should('be.visible');

  function assertMessage(msg: string) {
    cy.get(`[data-testid="${testingSelectors.toast}"]`).should(
      'have.text',
      msg,
    );
  }

  return { assertMessage };
}

function triggerShare() {
  cy.get(`[data-testid="${testingSelectors.shareButton}"]`).click();
}
