import { Tile, TileListContent } from '#ui/molecules/tile';
import { AltitudeListItem } from '#ui/molecules/altitude-list-item';
import { CoordinatesListItem } from '#ui/molecules/coordinates-list-item';
import { CourseListItem } from '#ui/molecules/course-list-item';
import { LocationUpdateTimeListItem } from '#ui/molecules/location-update-time-list-item';

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
