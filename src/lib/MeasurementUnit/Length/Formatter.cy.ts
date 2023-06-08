import { ZodError } from 'zod';
import { BaseLength, format, Kilometer, Meter } from '.';

describe(format.name, () => {
  it('should throw exception if unsupported unit is used', () => {
    cy.testException(() => format(15 as unknown as BaseLength)).then(
      (exception) => {
        exception().should('be.instanceOf', ZodError);
      },
    );
  });

  it('should return string in format "{value} {symbol}"', () => {
    expect(format(new Kilometer(150))).to.equal('150 km');
  });

  it('should keep decimal places specified by precision parameter', () => {
    expect(format(new Meter(21.92018431), 3)).to.equal('21.920 m');
  });
});
