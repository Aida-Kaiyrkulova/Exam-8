import { List, ListItemText, Divider, ListItemButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import React from 'react';

interface Category {
  title: string;
  id: string;
}

const categories: Category[] = [
  { title: 'Star Wars', id: 'star-wars' },
  { title: 'Famous people', id: 'famous-people' },
  { title: 'Saying', id: 'saying' },
  { title: 'Humour', id: 'humour' },
  { title: 'Motivational', id: 'motivational' },
];

const Sidebar: React.FC = () => {
  return (
    <div>
      <List>
        {categories.map((category) => (
          <NavLink
            to={`/category/${category.id}`}
            key={category.id}
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <ListItemButton>
              <ListItemText primary={category.title} />
            </ListItemButton>
          </NavLink>
        ))}
      </List>
      <Divider />
    </div>
  );
};

export default Sidebar;