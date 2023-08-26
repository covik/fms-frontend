import { ErrorContainer } from './index';

it('should render children', () => {
  const content = 'Content';
  cy.mount(<ErrorContainer>{content}</ErrorContainer>);
  cy.contains(content).should('be.visible');
});

it('should set data attributes', () => {
  const value = 'container';
  cy.mount(<ErrorContainer data-testid={value}>Content</ErrorContainer>);
  cy.get(`[data-testid="${value}"]`).should('be.visible');
});

it('should allow css overrides', () => {
  const flexValue = '0 0 0%';
  cy.mount(
    <ErrorContainer flex={flexValue} data-testid={'padding-override'}>
      Content
    </ErrorContainer>,
  );
  cy.get('[data-testid="padding-override"]').should(
    'have.css',
    'flex',
    flexValue,
  );
});
