import { convert, Knots, KPH, MPH } from '.';

const speedInKph = new KPH(60);
const speedInMph = new MPH(50);
const speedInKnots = new Knots(20);

specify('converting 60 km/h to km/h should return exactly number 60', () => {
  expect(convert(speedInKph).toKph().value()).to.equal(60);
});

specify('converting 60 km/h to mph should return number close to 37', () => {
  expect(convert(speedInKph).toMph().value()).to.be.closeTo(37, 0.3);
});

specify('converting 60 km/h to knots should return number close to 32', () => {
  expect(convert(speedInKph).toKnots().value()).to.be.closeTo(32, 0.4);
});

specify('converting 50 mph to mph should return exactly number 50', () => {
  expect(convert(speedInMph).toMph().value()).to.equal(50);
});

specify('converting 50 mph to km/h should return number close to 80', () => {
  expect(convert(speedInMph).toKph().value()).to.be.closeTo(80, 0.5);
});

specify('converting 50 mph to knots should return number close to 43', () => {
  expect(convert(speedInMph).toKnots().value()).to.be.closeTo(43, 0.5);
});

specify('converting 20 kt to kt should return exactly number 20', () => {
  expect(convert(speedInKnots).toKnots().value()).to.equal(20);
});

specify('converting 20 knots to km/h should return number close to 37', () => {
  expect(convert(speedInKnots).toKph().value()).to.be.closeTo(37, 0.1);
});

specify('converting 20 knots to mph should return number close to 23', () => {
  expect(convert(speedInKnots).toMph().value()).to.be.closeTo(23, 0.1);
});
