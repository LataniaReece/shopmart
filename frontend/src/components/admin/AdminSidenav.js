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
import InsightsIcon from '@mui/icons-material/Insights';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import EmailIcon from '@mui/icons-material/Email';
import ForumIcon from '@mui/icons-material/Forum';
import CommentIcon from '@mui/icons-material/Comment';

const AdminSidenav = () => {
  return (
    <nav>
      <div>
        <Typography variant='p' className='text-muted'>
          Dashboard
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
            <ListItemButton>
              <ListItemIcon>
                <InsightsIcon />
              </ListItemIcon>
              <ListItemText primary='Analytics' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary='Sales' />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
      <div>
        <Typography variant='p' className='text-muted'>
          Quick Menu
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary='Users' />
            </ListItemButton>
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
            <ListItemButton>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary='Transactions' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EqualizerIcon />
              </ListItemIcon>
              <ListItemText primary='Reports' />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
      <div>
        <Typography variant='p' className='text-muted'>
          Notifications
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary='Mail' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary='Feedback' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CommentIcon />
              </ListItemIcon>
              <ListItemText primary='Message' />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </nav>
  );
};

export default AdminSidenav;
