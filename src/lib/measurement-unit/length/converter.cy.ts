import {
  BaseLength,
  convertToKilometers,
  convertToMeters,
  Kilometer,
  Meter,
  UnsupportedConversionUnit,
} from '.';

class MockUnsupportedUnit extends BaseLength {
  public symbol(): string {
    return 'unsupported-value';
  }
}

const halfKilometer = new Kilometer(0.5);
const fiveHundredMeters = new Meter(500);
const twentyOneKilometers = new Kilometer(21.003);
const twentyOneThousandMeters = new Meter(21003);

const unsupportedUnit = new MockUnsupportedUnit(10);

describe(convertToMeters.name, () => {
  it(`should throw if parameters is not instanceof ${BaseLength.name}`, () => {
    cy.testException(() => convertToMeters(10 as unknown as BaseLength)).then(
      (exception) => {
        exception().should('be.instanceOf', UnsupportedConversionUnit);
      },
    );
  });

  it(`should return parameter if it is instanceof ${Meter.name}`, () => {
    const oneMeter = new Meter(1);
    expect(convertToMeters(oneMeter)).to.equal(oneMeter);
  });

  it(`should return ${fiveHundredMeters.value()} meters if parameter is ${halfKilometer.value()} kilometers`, () => {
    const result = convertToMeters(halfKilometer);

    expect(result).to.be.instanceOf(Meter);
    expect(result.value()).to.equal(fiveHundredMeters.value());
  });

  it(`should return ${twentyOneThousandMeters.value()} meters if parameter is ${twentyOneKilometers.value()} kilometers`, () => {
    const result = convertToMeters(twentyOneKilometers);

    expect(result).to.be.instanceOf(Meter);
    expect(result.value()).to.equal(21003);
  });

  it('should throw exception if unsupported unit is used', () => {
    cy.testException(() => convertToMeters(unsupportedUnit)).then(
      (exception) => {
        exception().should('be.instanceOf', UnsupportedConversionUnit);
      },
    );
  });
});

describe(convertToKilometers.name, () => {
  it(`should throw if parameters is not instanceof ${BaseLength.name}`, () => {
    cy.testException(() =>
      convertToKilometers(10 as unknown as BaseLength),
    ).then((exception) => {
      exception().should('be.instanceOf', UnsupportedConversionUnit);
    });
  });

  it(`should return parameter if it is instanceof ${Kilometer.name}`, () => {
    const oneKilometer = new Kilometer(1);
    expect(convertToKilometers(oneKilometer)).to.equal(oneKilometer);
  });

  it(`should return ${halfKilometer.value()} kilometers if parameter is ${fiveHundredMeters.value()} meters`, () => {
    const result = convertToKilometers(fiveHundredMeters);

    expect(result).to.be.instanceOf(Kilometer);
    expect(result.value()).to.equal(halfKilometer.value());
  });

  it(`should return ${twentyOneKilometers.value()} kilometers if parameter is ${twentyOneThousandMeters.value()} meters`, () => {
    const result = convertToKilometers(twentyOneThousandMeters);

    expect(result).to.be.instanceOf(Kilometer);
    expect(result.value()).to.equal(twentyOneKilometers.value());
  });

  it('should throw exception if unsupported unit is used', () => {
    cy.testException(() => convertToKilometers(unsupportedUnit)).then(
      (exception) => {
        exception().should('be.instanceOf', UnsupportedConversionUnit);
      },
    );
  });
});
