import { Tile, TileListContent } from '#ui/molecules/tile';
import { AltitudeListItem } from '../altitude-list-item';
import { CoordinatesListItem } from '../coordinates-list-item';
import { CourseListItem } from '../course-list-item';
import { LocationUpdateTimeListItem } from '../location-update-time-list-item';

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
