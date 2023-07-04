import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { DirectionsFork } from 'mdi-material-ui';

export interface CourseListItemAttributes {
  course: string;
}

export function CourseListItem({ course }: CourseListItemAttributes) {
  return (
    <ListItem>
      <ListItemIcon>
        <DirectionsFork />
      </ListItemIcon>
      <ListItemText primary="Smjer" secondary={course} />
    </ListItem>
  );
}
