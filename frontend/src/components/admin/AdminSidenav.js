import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AdminSidenav = () => {
  return (
    <nav>
      <div>
        <Typography variant='p' className='text-muted'>
          Quick Menu
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <Link to={'/admin/users'} className='admin-nav-link'>
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText primary='Users' />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link to={'/admin/products'} className='admin-nav-link'>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingBagIcon />
                </ListItemIcon>
                <ListItemText primary='Products' />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link to={'/admin/transactions'} className='admin-nav-link'>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary='Transactions' />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </div>
    </nav>
  );
};

export default AdminSidenav;
