import { format, Knots, KPH, MPH } from '.';

const units = [KPH, MPH, Knots];

units.forEach((Unit) => {
  const zero = new Unit(0);
  const integer = new Unit(100);
  const decimal = new Unit(150.4123);

  const symbol = zero.symbol();

  specify(`format 0 ${symbol} should return "0 ${symbol}"`, () => {
    expect(format(zero)).to.equal(`0 ${symbol}`);
  });

  specify(`format integer ${symbol} should return "100 ${symbol}"`, () => {
    expect(format(integer)).to.equal(`100 ${symbol}`);
  });

  specify(`format decimal ${symbol} should round the value`, () => {
    expect(format(decimal)).to.equal(`150 ${symbol}`);
  });
});
