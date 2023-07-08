import { endOfMonth, startOfMonth } from 'date-fns';
import { z } from 'zod';
import { Http } from '#lib/http-client';
import { Length } from '#lib/MeasurementUnit';
import { TraccarRouteSummary } from '#lib/Traccar';
import { MileageSummary } from '../../models/mileage-summary';

const RangeParameters = z.object({
  vehicleIds: z.array(z.string().trim().min(1)),
  from: z.date(),
  to: z.date(),
});

type RangeAttributes = z.infer<typeof RangeParameters>;

const headers = {
  Accept: 'application/json',
};

export async function fetchForMonth(
  month: Date,
  vehicleIds: string[],
  signal?: AbortSignal,
): Promise<MileageSummary[]> {
  const params = constructURLParams({
    vehicleIds,
    from: startOfMonth(month),
    to: endOfMonth(month),
  });

  const response = await Http.request(
    `/api/reports/summary?${params.toString()}`,
    { signal, headers },
  );
  const responseJson = await response.json();
  const summaryList = z.array(TraccarRouteSummary).parse(responseJson);

  return summaryList.map(
    (summary) =>
      new MileageSummary({
        vehicleId: String(summary.deviceId),
        vehicleName: summary.deviceName,
        mileage: new Length.Meter(summary.distance),
        odometer: new Length.Meter(summary.endOdometer),
      }),
  );
}

function constructURLParams(options: RangeAttributes): URLSearchParams {
  const { vehicleIds, from, to } = RangeParameters.parse(options);
  const fromAsIsoString = from.toISOString();
  const toAsIsoString = to.toISOString();
  return new URLSearchParams([
    ...vehicleIds.map((id) => ['deviceId', id]),
    ['from', fromAsIsoString],
    ['to', toAsIsoString],
  ]);
}
