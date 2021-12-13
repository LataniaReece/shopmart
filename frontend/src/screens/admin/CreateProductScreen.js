import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  Typography,
  TextField,
  Alert,
  Button,
} from '@mui/material';

const CreateProductScreen = () => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <Box sx={{ my: 5 }}>
      <form
        className='form-container create-product-form'
        onSubmit={handleSubmit}
      >
        <Typography textAlign='center' variant='h4'>
          Create New Product
        </Typography>
        {message && <Alert severity='error'>{message}</Alert>}
        <div>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='title'
              type='text'
              label='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant='outlined'
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField placeholder='Product description' multiline rows={5} />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='price'
              type='number'
              label='Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              variant='outlined'
              inputProps={{ inputMode: 'numeric', min: '0' }}
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='color'
              type='text'
              label='Color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
              variant='outlined'
              helperText='e.g blue, red, green'
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='categories'
              type='text'
              label='Categories'
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              variant='outlined'
              helperText='e.g shirt, jacket, shoes'
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='size'
              type='text'
              label='Sizes'
              value={size}
              onChange={(e) => setSize(e.target.value)}
              variant='outlined'
              helperText='e.g small, medium, large'
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='image'
              type='file'
              onChange={(e) => setSize(e.target.value)}
              variant='outlined'
            />
          </FormControl>
        </div>
        <Button variant='contained' sx={{ mt: 5, width: '100%' }} type='submit'>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateProductScreen;
