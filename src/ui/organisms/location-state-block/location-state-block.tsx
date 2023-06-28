import {
  AltitudeListItem,
  CoordinatesListItem,
  CourseListItem,
  LocationUpdateTimeListItem,
  Tile,
  TileListContent,
} from '#ui/molecules';

export interface LocationStateBlockAttributes {
  altitude: string;
  coordinates: string;
  course: string;
  updatedAt: string;
}

export function LocationStateBlock({
  altitude,
  coordinates,
  course,
  updatedAt,
}: LocationStateBlockAttributes) {
  return (
    <Tile label={'Lokacija'}>
      <TileListContent>
        <CoordinatesListItem coordinates={coordinates} />
        <LocationUpdateTimeListItem updatedAt={updatedAt} />
        <CourseListItem course={course} />
        <AltitudeListItem altitude={altitude} />
      </TileListContent>
    </Tile>
  );
}
