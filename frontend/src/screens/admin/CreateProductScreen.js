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
    <Box>
      <form className='form-container' onSubmit={handleSubmit}>
        <Typography textAlign='center' variant='h4'>
          Create New Product
        </Typography>
        {message && <Alert severity='error'>{message}</Alert>}
        <div>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='title'
              type='text'
              label='Product Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant='outlined'
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              placeholder='MultiLine with rows: 2 and rowsMax: 4'
              multiline
              rows={2}
              rowsMax={4}
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
