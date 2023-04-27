import { WebShare } from './';

const url = 'https://www.google.com';
const title = 'Share Google Search';

describe('WebShare API', () => {
  afterEach(() => {
    // @ts-expect-error
    cy.window().then((win) => delete win.navigator.share);
  });

  it('should share url using native WebShare API if platform supports it', () => {
    const stub = cy.stub().as('shareStub');
    mockNativeWebShare(stub);
    cy.get('@shareStub').should('not.have.been.called');

    cy.then(() => WebShare.shareUrl(url, title)).log('shareUrl');

    cy.get('@shareStub').should('have.been.calledOnceWithExactly', {
      url,
      title,
    });
  });

  it('should propagate errors thrown by navigator.share', () => {
    const message = 'I simulate native error.';
    const stub = cy.stub();
    stub.callsFake(() => Promise.reject(new Error(message)));
    stub.as('shareStub');
    mockNativeWebShare(stub);

    cy.testException(() => WebShare.shareUrl(url, title)).then((exception) => {
      exception().should('be.instanceOf', Error);
      exception().should('have.property', 'message', message);
    });
  });

  it('should resolve Promise with "webshare" on success', () => {
    mockNativeWebShare(cy.stub());

    cy.then(() => WebShare.shareUrl(url, title)).then((value) => {
      expect(value).to.equal('webshare');
    });
  });
});

describe('Clipboard API', () => {
  // I can't deal with the browsers right now!!!
  if (Cypress.browser.name === 'firefox') return;

  beforeEach(() => {
    cy.window().then((win) => expect(win).not.to.have.property('share'));
  });

  afterEach(() => {
    // @ts-expect-error
    cy.window().then((win) => delete win.navigator.clipboard);
  });

  it('should fallback to copy-to-clipboard if native WebShare API is not supported', () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, 'writeText').as('clipboardStub');
    });
    cy.get('@clipboardStub').should('not.have.been.called');

    cy.log('shareUrl')
      .then(() => WebShare.shareUrl(url, title))
      .log('shareUrl');

    cy.get('@clipboardStub').should('have.been.calledOnceWithExactly', url);
  });

  it('should propagate errors thrown by navigator.clipboard.writeText', () => {
    const message = 'I simulate native error.';
    cy.window().then((win) => {
      const stub = cy.stub(win.navigator.clipboard, 'writeText');
      stub.callsFake(() => Promise.reject(new Error(message)));
      stub.as('clipboardStub');
    });

    cy.log('shareUrl')
      .testException(() => WebShare.shareUrl(url, title))
      .then((exception) => {
        exception().should('be.instanceOf', Error);
        exception().should('have.property', 'message', message);
      });
  });

  it('should resolve Promise with "clipboard" on success', () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, 'writeText');
    });

    cy.then(() => WebShare.shareUrl(url, title)).then((value) => {
      expect(value).to.equal('clipboard');
    });
  });
});

function mockNativeWebShare(stub: ReturnType<typeof cy.stub>) {
  cy.window().then((win) => {
    win.navigator.share = stub;
  });
}

describe('No available API', () => {
  let clipboardPrototype: Clipboard;

  beforeEach(() => {
    cy.window().then((win) => {
      // @ts-expect-error
      clipboardPrototype = win.navigator?.clipboard?.__proto__;

      // @ts-expect-error
      delete win.navigator.share;
      if (win.navigator.clipboard) {
        // @ts-expect-error
        win.navigator.clipboard.__proto__ = {};
      }
    });
  });

  afterEach(() => {
    cy.window().then((win) => {
      if (win.navigator.clipboard) {
        // @ts-expect-error
        win.navigator.clipboard.__proto__ = clipboardPrototype;
      }
    });
  });

  it('should throw exception if there is neither API', () => {
    cy.log('shareUrl')
      .testException(() => WebShare.shareUrl(url, title))
      .then((exception) => {
        exception().should('be.instanceOf', WebShare.NoNativeSharingMechanism);
      });
  });
});
