import { Knots, KPH, MPH } from '.';

specify('validate unit symbols', () => {
  expect(new KPH(0).symbol()).to.equal('km/h');
  expect(new MPH(0).symbol()).to.equal('mph');
  expect(new Knots(0).symbol()).to.equal('kt');
});
