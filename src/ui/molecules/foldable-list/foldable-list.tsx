import { useState } from 'react';
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from '@mui/material';
import { ChevronDown, ChevronUp } from 'mdi-material-ui';
import type { ReactElement } from 'react';

const skeleton = <Skeleton variant={'text'} width={'50px'} />;

export interface Item {
  id: string;
  label: string;
  value: string | undefined;
  icon?: ReactElement;
}

export interface FoldableListAttributes {
  items: Item[];
  initialExpanded?: boolean;
}

export function FoldableList({
  items,
  initialExpanded = false,
}: FoldableListAttributes) {
  const [expanded, setExpanded] = useState(initialExpanded);

  function onToggle() {
    setExpanded(!expanded);
  }

  if (items.length === 0) return null;

  const firstItem = items[0];
  const expandableItems = items.slice(1);

  return (
    <List disablePadding dense>
      <ListItemButton onClick={onToggle} key={firstItem.id}>
        {firstItem.icon ? <ListItemIcon>{firstItem.icon}</ListItemIcon> : null}
        <ListItemText
          primary={firstItem.label}
          secondary={firstItem.value ?? skeleton}
        />
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </ListItemButton>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          {expandableItems.map((item) => {
            return (
              <ListItem key={item.id}>
                {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
                <ListItemText
                  primary={item.label}
                  secondary={item.value ?? skeleton}
                />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
}
