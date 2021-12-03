import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, IconButton, Toolbar, AppBar, Drawer, List, ListItemButton, ListItem, ListItemText, Badge} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getCartInfo } from '../actions/cartActions';

const Navbar = () => {
    const [isOpenSideDrawer, setIsOpenSideDrawer] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)

    useEffect(() => {
        if(!cart){
            dispatch(getCartInfo())
        }
    }, [cart, dispatch])

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }    
        setIsOpenSideDrawer(open)
      };

    return (
        <>
            <Box sx={{ flexGrow: 1}}>
                <AppBar position="static" sx={{color: 'white'}}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(true)} 
                        >
                            <MenuIcon />
                        </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <Link to="/">ShopMart</Link>
                            </Typography>
                        <Button color="inherit">Login</Button>
                        <Link to="/cart">
                            <Badge badgeContent={cart.quantity} color="primary">
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
                sx={{width: 250}} 
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <nav aria-label="secondary mailbox folders">
                    <List>
                        <ListItemButton onClick={() => navigate('/products/category/women')}>
                            <ListItem disablePadding>
                            <ListItemText primary="Women" />
                            </ListItem>
                        </ListItemButton>
                        <ListItemButton onClick={() => navigate('/products/category/men')}>
                            <ListItem disablePadding>
                            <ListItemText primary="Men" />
                            </ListItem>
                        </ListItemButton>
                    </List>
                </nav>
            </Box>
        </Drawer>
        </>
    )
}

export default Navbar
