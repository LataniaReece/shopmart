import React from 'react'
import {AppBar, Container, Toolbar, Typography} from '@mui/material'

const Footer = () => {
    return (
        <AppBar className="footer" position="static" color="light" sx={{mt: 4}}>
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit">
                © 2021 ShopMart
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}

export default Footer
