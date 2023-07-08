import { RouteStop } from './route-stop';
import { Coordinates } from '#lib/dimension';

const twoHours = 2 * 3600;
const thirtyMinutes = 30 * 60;
const tenMinutes = 10 * 60;

export const stops = [
  new RouteStop({
    id: '1',
    startTime: new Date('2000-01-01T05:00:00'),
    endTime: new Date('2000-01-01T07:00:00'),
    duration: twoHours,
    coordinates: new Coordinates(45.64, 15.14),
  }),
  new RouteStop({
    id: '2',
    startTime: new Date('2000-01-01T08:00:00'),
    endTime: new Date('2000-01-01T08:30:00'),
    duration: thirtyMinutes,
    coordinates: new Coordinates(45.13, 15.78),
  }),
  new RouteStop({
    id: '3',
    startTime: new Date('2000-01-01T10:00:00'),
    endTime: new Date('2000-01-01T10:10:00'),
    duration: tenMinutes,
    coordinates: new Coordinates(45.89, 15.23),
  }),
];

export const totalDuration = twoHours + thirtyMinutes + tenMinutes;
