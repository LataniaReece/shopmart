import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const ShowcaseComponent = () => {
  return (
    <div className='showcase-img'>
      <div className='overlay'>
        <Container maxWidth='md'>
          <div className='showcase-content-container'>
            <Box sx={{ display: 'flex', alignItems: 'center', height: 100 }}>
              <Typography
                variant='h1'
                align='center'
                sx={{
                  mb: 3,
                  mt: 5,
                  fontSize: '4rem',
                  fontWeight: 'medium',
                  letterSpacing: 2,
                }}
              >
                Welcome to ShopMart
              </Typography>
            </Box>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ShowcaseComponent;
