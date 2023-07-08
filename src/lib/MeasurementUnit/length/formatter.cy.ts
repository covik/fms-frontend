import { ZodError } from 'zod';
import { adaptiveFormat, BaseLength, format, Kilometer, Meter } from '.';

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

describe(adaptiveFormat.name, () => {
  it('should throw exception if unsupported unit is used', () => {
    cy.testException(() => adaptiveFormat(15 as unknown as BaseLength)).then(
      (exception) => {
        exception().should('be.instanceOf', ZodError);
      },
    );
  });

  it('should convert meters to kilometers if length is more than 1000 meters', () => {
    const thousandMeters = new Meter(1000);
    expect(adaptiveFormat(thousandMeters, 1)).to.equal('1.0 km');
  });

  it('should convert kilometers to meters if length is less than 1 kilometer', () => {
    const almostOneKilometer = new Kilometer(0.999);
    expect(adaptiveFormat(almostOneKilometer, 1)).to.equal('999.0 m');
  });

  it('should correctly truncate decimals when converting large meter value to kilometers', () => {
    const tooManyMeters = new Meter(997412574.513);
    const precision = 6;
    const expectedValue = '997412.574513';
    expect(adaptiveFormat(tooManyMeters, precision)).to.equal(
      `${expectedValue} km`,
    );
  });
});
