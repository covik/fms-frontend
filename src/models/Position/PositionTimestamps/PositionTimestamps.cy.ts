import { PositionTimestamps } from './PositionTimestamps';
import { InvalidPositionTimestampException } from './Exception';

const fixTime = new Date('2000-01-01T12:12:00');
const deviceTime = new Date('2000-01-01T12:12:01');
const serverTime = new Date('2000-01-01T12:13:05');

const timestamps = new PositionTimestamps(fixTime, deviceTime, serverTime);

describe(PositionTimestamps.name, () => {
  const invalidAttributeSituations = [
    {
      attribute: 'fixTime',
      construct: () =>
        new PositionTimestamps(
          'invalid' as unknown as Date,
          new Date(),
          new Date(),
        ),
      expectedMessage: 'Attribute "fixTime" should be Date object.',
    },
    {
      attribute: 'deviceTime',
      construct: () =>
        new PositionTimestamps(
          new Date(),
          'invalid' as unknown as Date,
          new Date(),
        ),
      expectedMessage: 'Attribute "deviceTime" should be Date object.',
    },
    {
      attribute: 'serverTime',
      construct: () =>
        new PositionTimestamps(
          new Date(),
          new Date(),
          'invalid' as unknown as Date,
        ),
      expectedMessage: 'Attribute "serverTime" should be Date object.',
    },
  ];

  invalidAttributeSituations.forEach((situation) => {
    it(`should throw exception if ${situation.attribute} is not instance of Date`, () => {
      cy.testException(() => situation.construct()).then((exception) => {
        exception().should('be.instanceOf', InvalidPositionTimestampException);
        exception().should(
          'have.property',
          'message',
          situation.expectedMessage,
        );
      });
    });
  });

  it('should return passed arguments through getters', () => {
    expect(timestamps.fixationTime()).to.equal(fixTime);
    expect(timestamps.deviceTime()).to.equal(deviceTime);
    expect(timestamps.serverTime()).to.equal(serverTime);
  });

  specify(
    'latencyInSeconds() should return number of seconds between fixation time and server time',
    () => {
      expect(timestamps.latencyInSeconds()).to.equal(65);
    },
  );
});
