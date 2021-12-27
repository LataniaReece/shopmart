import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Toolbar,
  AppBar,
  Drawer,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getCartInfo } from '../actions/cartActions';
import { logout } from '../actions/userActions';

const Navbar = () => {
  const [isOpenSideDrawer, setIsOpenSideDrawer] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categories = [
    'women',
    'men',
    'coat',
    'jacket',
    'shirt',
    'tshirt',
    'pants',
    'skirt',
    'hat',
    'sweater',
  ];

  useEffect(() => {
    if (!cart) {
      dispatch(getCartInfo());
    }
  }, [cart, dispatch]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsOpenSideDrawer(open);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' sx={{ color: 'white' }}>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Link to='/'>ShopMart</Link>
            </Typography>
            {userInfo && userInfo._id && (
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                Welcome, {titleCase(userInfo.username)}
              </Typography>
            )}
            {userInfo && userInfo._id ? (
              <>
                <Link to={'/orders'}>
                  <Button color='inherit'>My Orders</Button>
                </Link>
                {userInfo.isAdmin && (
                  <Link to={'/admin'}>
                    <Button color='inherit'>Admin</Button>
                  </Link>
                )}
                <Link to='#' onClick={() => logoutHandler()}>
                  <Button color='inherit'>Logout</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to={'/login'}>
                  <Button color='inherit'>Login</Button>
                </Link>
                <Link to={'/register'}>
                  <Button color='inherit'>Register</Button>
                </Link>
              </>
            )}
            <Link to='/cart'>
              <Badge badgeContent={cart.quantity} color='primary'>
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        anchor='left'
        open={isOpenSideDrawer}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <nav aria-label='secondary mailbox folders'>
            <List>
              {categories.map((category) => (
                <ListItemButton
                  onClick={() => navigate(`/products/category/${category}`)}
                >
                  <ListItem disablePadding>
                    <ListItemText primary={`${titleCase(category)}`} />
                  </ListItem>
                </ListItemButton>
              ))}
            </List>
          </nav>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
