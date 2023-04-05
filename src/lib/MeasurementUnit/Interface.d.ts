export interface MeasurementUnit {
  value: () => number;
  symbol: () => string;
}

export interface SpeedUnit extends MeasurementUnit {}

export interface LengthUnit extends MeasurementUnit {}

export interface TemperatureUnit extends MeasurementUnit {}

export interface AngleUnit extends MeasurementUnit {}
