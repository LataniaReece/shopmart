import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { Box, Typography, Button, IconButton, Toolbar, AppBar, Drawer, List, ListItemButton, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
    const [isOpenSideDrawer, setIsOpenSideDrawer] = useState(false)

    const navigate = useNavigate();

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
                        >
                        <MenuIcon onClick={toggleDrawer(true)} />
                        </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <Link to="/">ShopMart</Link>
                            </Typography>
                        <Button color="inherit">Login</Button>
                        <Link to="/cart">
                            <ShoppingCartIcon />
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
