import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CompassOutline } from 'mdi-material-ui';

export interface CourseListItemAttributes {
  course: string;
}

export function CourseListItem({ course }: CourseListItemAttributes) {
  return (
    <ListItem>
      <ListItemIcon>
        <CompassOutline />
      </ListItemIcon>
      <ListItemText primary="Smjer" secondary={course} />
    </ListItem>
  );
}
